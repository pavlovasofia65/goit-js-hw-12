import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotos } from "./js/pixabay-api";
import { createPhotoCard } from "./js/render-functions";

const load = document.querySelector('.load');
const form = document.querySelector('.form');
const button = document.querySelector('.button');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.input');
const btnMore = document.querySelector('.btn-more');
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

let page = 1; 
let totalPages = 0;
let query = '';

const onSearchFormSubmit = async evt => {
    try {
        evt.preventDefault();
        query = input.value.trim();

        if (query === '') {
            iziToast.error({
                message: "Field must be filled in.",
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        page = 1;
        btnMore.classList.add('hidden');
        load.classList.remove('hidden');

        const { data } = await fetchPhotos(query, page);

        if (data.hits.length === 0) {
            gallery.innerHTML = '';
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 3000,
            });
            form.reset();
            return;
        }

        totalPages = Math.ceil(data.totalHits / 15);

        if (totalPages > 1) {
            btnMore.classList.remove('hidden');
            btnMore.addEventListener('click', onBtnMoreClick);
        }

        const markup = data.hits.map(photo => createPhotoCard(photo) ).join("");
        gallery.innerHTML = markup;
        lightbox.refresh();
        load.classList.add('hidden');

        const firstCard = document.querySelector('.gallery .item'); 
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight,
                behavior: 'smooth', 
            });
        }

    } catch (err) {
        console.log(err);
    }
}

const onBtnMoreClick = async evt => {
    try {
        load.classList.remove('hidden');
        page++;
        const { data } = await fetchPhotos(query, page);

        const markup = data.hits.map(photo => createPhotoCard(photo) ).join("");
        gallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        load.classList.add('hidden');

        const firstCard = document.querySelector('.gallery .item'); 
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight,
                behavior: 'smooth', 
            });
        }

        if (page === totalPages) {
            btnMore.classList.add('hidden');
            btnMore.removeEventListener('click', onBtnMoreClick);
        } 
    } catch(err) {
        console.log(err);
    }
}

form.addEventListener('submit', onSearchFormSubmit);
