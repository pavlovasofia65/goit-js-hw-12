import axios from 'axios';

export const fetchPhotos = (query, page) => {
    const options = {
        key: '34921849-da8a609ca2d9d5a3e9034ffad',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 15,
    }
    const params = new URLSearchParams(options).toString();

    return axios.get(`https://pixabay.com/api/?${params}`);
};