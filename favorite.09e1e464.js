!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in a){var o=a[e];delete a[e];var t={id:e,exports:{}};return n[e]=t,o.call(t.exports,t,t.exports),t.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,n){a[e]=n},e.parcelRequired7c6=o),o("bcAyb"),o("hIhpl"),o("hZqpd"),o("ak1PV"),o("2UeNT"),o("5OG1Q"),o("dZyLz"),o("hqWnV"),o("awokh");var t=o("5OG1Q"),c=o("hqWnV"),i=document.querySelector(".favorite-collection");console.log(i);var r=t.default.load("favorite");console.log(r);var l=t.default.load("readMoreLocal");console.log(l);var d=0,s=[];console.log(s);var u=!0,v=!1,f=void 0;try{for(var p,h=function(e,n){var a=n.value;d+=1;var o="https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering";0!==a.media.length&&(o=a.media[0]["media-metadata"][2].url);var i='<div class="news-card '.concat("news-card--".concat(a.id)," grid grid-item-").concat(d,'">\n\n  <div class="top-wrap">\n  <img\n  src="').concat(o,'"\n  loading="lazy"\n  width="288"\n                height="395"\n                class="news-img"\n                />\n                <p class="isread ').concat("isread--".concat(a.id),'"></p>\n                <div class="category-wrap">\n                <p class="top-text">').concat(a.section,'</p>\n                </div>\n                <button class="favorite-btn ').concat("favorite-btn--".concat(a.id),' favorite-btn--active" data-id="').concat(a.id,'">\n                ').concat(c.removeFavoriteBtnHTML,'\n              </button>\n              </div>\n              <div class="info">\n              <h2 class="info-item">').concat(a.title,'</h2>\n              <p class="describe">').concat(a.abstract,'</p>\n              <div class="lower-content">\n                <p class="news-date">').concat(a.published_date,'</p>\n                <a class="news-link ').concat("news-link--".concat(a.id),' link" href="').concat(a.url,'"  onclick="handleRead()" target="_blank">Read more</a>\n                </div>\n                </div>\n                </div>\n\n                ');setTimeout((function(){var e=document.querySelector(".favorite-btn--".concat(a.id)),n=document.querySelector(".news-link--".concat(a.id)),o=document.querySelector(".isread--".concat(a.id)),i=document.querySelector(".news-card--".concat(a.id));console.log(e),console.log(n);var r=t.default.load("readMoreLocal");!0===(0,c.checkLokalStorage)(a,r)&&(o.innerHTML=c.alreadyRead,i.classList.add("opacity")),e.onclick=(0,c.handleFavorite)(a,e,!0),n.onclick=(0,c.handleRead)(a,o,i)}),0),s.push(i)},m=r[Symbol.iterator]();!(u=(p=m.next()).done);u=!0)h(0,p)}catch(e){v=!0,f=e}finally{try{u||null==m.return||m.return()}finally{if(v)throw f}}i.insertAdjacentHTML("beforeend",s.join("")),o("fj9x3"),o("iRCFg");var g=document.querySelector(".mask");window.addEventListener("load",(function(){g.classList.add(".hide"),setTimeout((function(){g.remove()}),600)}))}();
//# sourceMappingURL=favorite.09e1e464.js.map