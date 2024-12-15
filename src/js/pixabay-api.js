import axios from 'axios';
import iziToast from "izitoast";// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const load = document.querySelector('.load');
const button = document.querySelector('.button');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.input');
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

button.addEventListener("click", (evt)=>{
    evt.preventDefault();

    load.classList.remove('hidden');
    const fetchGallery = async () => {
        const response = await 
        axios.get(`ttps://pixabay.com/api?${options}`, {
            key: '34921849-da8a609ca2d9d5a3e9034ffad',
            q: input.value.trim(),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: 1,
            per_page: 15,
        });
        return response.data;
    };

    // const options = {
    //     key: '34921849-da8a609ca2d9d5a3e9034ffad',
    //     q: input.value.trim(),
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: 'true',
    // // }
    // const params = new URLSearchParams(options).toString();
    // fetch(`https://pixabay.com/api/?${params}`) 
    fetchGallery()
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((photos) => {
            if (photos.hits.length === 0) {
                gallery.innerHTML = '';
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: 'topRight',
                    timeout: 3000,
                });
                return;
            }

            const markup = photos.hits
                .map((photo) => {
                    return `
                        <li class="item">
                            <a href="${photo.largeImageURL}">
                                <img alt="${photo.tags}" src="${photo.webformatURL}" width="360" height="200"/>
                            </a>
                            <div class="card"><p class="info-item"><b>Likes</b>${photo.likes}</p>
                            <p class="info-item"><b>Views</b>${photo.views}</p>
                            <p class="info-item"><b>Comments</b>${photo.comments}</p>
                            <p class="info-item"><b>Downloads</b>${photo.downloads}</p>
                            </div>
                        </li>`;
            })
            .join("");
            gallery.innerHTML = markup;
            lightbox.refresh();
        })
        .catch((error) => {
            iziToast.error({
                message: `Error: ${error.message}`,
                position: 'topRight',
                timeout: 3000,
            })
        })
        .finally(() => {
            load.classList.add('hidden');
            input.value = '';
        });
});
