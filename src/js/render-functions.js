export const createPhotoCard = photo => {
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
}