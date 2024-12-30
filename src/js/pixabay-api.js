// Імпорти бібліотек
import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Оголошення змінних

const load = document.querySelector('.load');
const btnMore = document.querySelector('.more');
const button = document.querySelector('.button');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.input');
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

// Створення галереї за кліком

let page = 1; // поточна сторінка
let totalHits = 0; // скільки знайдених зображень

//обробка кнопки при кліку
button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    page = 1; 
    load.classList.remove('hidden');
    gallery.innerHTML = ''; 

    try {
        const photos = await fetchGallery();
        totalHits = photos.totalHits;
        // не знайдено зображення
        if (photos.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 3000,
            });
            btnMore.classList.add('hidden');
            return;
        }

        renderGallery(photos.hits);
        btnMore.classList.remove('hidden');
    }   // Обробка помилок 
        catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
            timeout: 3000,
        });
    } finally {
        load.classList.add('hidden');
        input.value = '';
    }
});

// Завантаження інших елементів галереї 

btnMore.addEventListener("click", async () => {
    if (page >= Math.ceil(totalHits / 15)) {
        // коли закінчились всі фото
        iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        });
        btnMore.classList.add('hidden');
        return;
    }

    // нові сторінки із зображеннями
    page += 1;
    load.classList.remove('hidden');
    try {
        const photos = await fetchGallery();
        renderGallery(photos.hits);
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
            timeout: 3000,
        });
    }
    finally {
        load.classList.add('hidden');
    }
});

// Функція запиту до Pixabay

const fetchGallery = async () => {
    // чи порожній запит
    if (input.value.trim() === '') {
        iziToast.error({
            message: "Please enter a search query!",
            position: "topRight",
            timeout: 3000,
        });
        throw new Error("Search query is empty.");
    }

    try {
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '34921849-da8a609ca2d9d5a3e9034ffad',
            q: input.value.trim(),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page,
            per_page: 15,
        },
    });
    return response.data;
} catch (error) {
    console.log(error);
    iziToast.error({
        message: error.message,
        position: "topRight",
        timeout: 3000,
    });
    throw error;
}};

// Функція створення галереї

const renderGallery = (photos) => {
    const markup = photos.map((photo) => {
        return `
            <li class="item">
                <a href="${photo.largeImageURL}">
                    <img alt="${photo.tags}" src="${photo.webformatURL}" width="360" height="200"/>
                </a>
                <div class="card">
                    <p class="info-item"><b>Likes</b>${photo.likes}</p>
                    <p class="info-item"><b>Views</b>${photo.views}</p>
                    <p class="info-item"><b>Comments</b>${photo.comments}</p>
                    <p class="info-item"><b>Downloads</b>${photo.downloads}</p>
                </div>
            </li>`;
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const firstCard = document.querySelector('.gallery .item'); 
    if (firstCard) {
        const cardHeight = firstCard.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight,
            behavior: 'smooth', 
        });
    }
};
