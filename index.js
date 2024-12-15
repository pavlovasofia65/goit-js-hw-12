import{S as d,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const c=document.querySelector(".load"),m=document.querySelector(".button"),l=document.querySelector(".gallery"),u=document.querySelector(".input"),f=new d(".gallery a",{captionDelay:250});m.addEventListener("click",n=>{n.preventDefault(),c.classList.remove("hidden");const i={key:"34921849-da8a609ca2d9d5a3e9034ffad",q:u.value.trim(),image_type:"photo",orientation:"horizontal",safesearch:"true"},o=new URLSearchParams(i).toString();fetch(`https://pixabay.com/api/?${o}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0){l.innerHTML="",a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3});return}const t=r.hits.map(e=>`
                        <li class="item">
                            <a href="${e.largeImageURL}">
                                <img alt="${e.tags}" src="${e.webformatURL}" width="360" height="200"/>
                            </a>
                            <div class="card"><p class="info-item"><b>Likes</b>${e.likes}</p>
                            <p class="info-item"><b>Views</b>${e.views}</p>
                            <p class="info-item"><b>Comments</b>${e.comments}</p>
                            <p class="info-item"><b>Downloads</b>${e.downloads}</p>
                            </div>
                        </li>`).join("");l.innerHTML=t,f.refresh()}).catch(r=>{a.error({message:`Error: ${r.message}`,position:"topRight",timeout:3e3})}).finally(()=>{c.classList.add("hidden"),u.value=""})});
//# sourceMappingURL=index.js.map
