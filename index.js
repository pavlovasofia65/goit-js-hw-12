import{S as d,i as n,a as m}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const c=document.querySelector(".load"),f=document.querySelector(".button"),l=document.querySelector(".gallery"),u=document.querySelector(".input"),p=new d(".gallery a",{captionDelay:250});f.addEventListener("click",a=>{a.preventDefault(),c.classList.remove("hidden"),(async()=>(await m.get(`ttps://pixabay.com/api?${options}`,{key:"34921849-da8a609ca2d9d5a3e9034ffad",q:u.value.trim(),image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:15})).data)().then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0){l.innerHTML="",n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3});return}const s=t.hits.map(e=>`
                        <li class="item">
                            <a href="${e.largeImageURL}">
                                <img alt="${e.tags}" src="${e.webformatURL}" width="360" height="200"/>
                            </a>
                            <div class="card"><p class="info-item"><b>Likes</b>${e.likes}</p>
                            <p class="info-item"><b>Views</b>${e.views}</p>
                            <p class="info-item"><b>Comments</b>${e.comments}</p>
                            <p class="info-item"><b>Downloads</b>${e.downloads}</p>
                            </div>
                        </li>`).join("");l.innerHTML=s,p.refresh()}).catch(t=>{n.error({message:`Error: ${t.message}`,position:"topRight",timeout:3e3})}).finally(()=>{c.classList.add("hidden"),u.value=""})});
//# sourceMappingURL=index.js.map
