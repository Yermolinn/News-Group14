var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,o.call(a.exports,a,a.exports),a.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o),o("jpOqa"),o("2pqRp"),o("53eoa"),o("eoOxN"),o("9B6Dv"),o("jN3nA"),o("kKRsn"),o("aet5G"),o("avbtB");var a=o("1EaU7"),d=o("aet5G");const c=document.querySelector(".favorite-collection");console.log(c);const l=a.default.load("favorite");console.log(l);const i=a.default.load("readMoreLocal");console.log(i);let s=0;const r=[];console.log(r);for(const e of l){s+=1;let n="https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering";0!==e.media.length&&(n=e.media[0]["media-metadata"][2].url);let t=`<div class="news-card news-card--${e.id} grid grid-item-${s}">\n\n  <div class="top-wrap">\n  <img\n  src="${n}"\n  loading="lazy"\n  width="288"\n                height="395"\n                class="news-img"\n                />\n                <p class="isread isread--${e.id}"></p>\n                <div class="category-wrap">\n                <p class="top-text">${e.section}</p>\n                </div>\n                <button class="favorite-btn favorite-btn--${e.id} favorite-btn--active" data-id="${e.id}">\n                ${d.removeFavoriteBtnHTML}\n              </button>\n              </div>\n              <div class="info">\n              <h2 class="info-item">${e.title}</h2>\n              <p class="describe">${e.abstract}</p>\n              <div class="lower-content">\n                <p class="news-date">${e.published_date}</p>\n                <a class="news-link news-link--${e.id} link" href="${e.url}"  onclick="handleRead()" target="_blank">Read more</a>\n                </div>\n                </div>\n                </div>\n\n                `;setTimeout((()=>{const n=document.querySelector(`.favorite-btn--${e.id}`),t=document.querySelector(`.news-link--${e.id}`),o=document.querySelector(`.isread--${e.id}`),c=document.querySelector(`.news-card--${e.id}`);console.log(n),console.log(t);let l=a.default.load("readMoreLocal");!0===(0,d.checkLokalStorage)(e,l)&&(o.innerHTML=d.alreadyRead,c.classList.add("opacity")),n.onclick=(0,d.handleFavorite)(e,n,!0),t.onclick=(0,d.handleRead)(e,o,c)}),0),r.push(t)}c.insertAdjacentHTML("beforeend",r.join("")),o("dGOBj"),o("iibg0"),o("6V8Dm");a=o("1EaU7");const u=document.getElementById("checkbox"),f=document.getElementById("checkbox-toggle");u.addEventListener("change",(function(){const e=u.checked?"dark":"light";f.checked="dark"===e,document.body.className=e,a.default.save("currentMode",e)})),f.addEventListener("change",(function(){const e=f.checked?"dark":"light";u.checked="dark"===e,document.body.className=e,a.default.save("currentMode",e)})),function(){const e=a.default.load("currentMode");""===e||"light"===e?(document.body.className="light",u.checked=!1,f.checked=!1):"dark"===e&&(document.body.className="dark",u.checked=!0,f.checked=!0)}(),o("2s6iM");
//# sourceMappingURL=favorite.22d601b0.js.map
