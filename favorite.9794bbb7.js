!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,n){a[e]=n},e.parcelRequired7c6=t),t("bcAyb"),t("hIhpl"),t("hZqpd"),t("ak1PV"),t("2UeNT"),t("5OG1Q"),t("dZyLz"),t("hqWnV"),t("awokh");var o=t("5OG1Q"),c=t("hqWnV"),i=document.querySelector(".favorite-collection"),r=o.default.load("favorite"),d=(o.default.load("readMoreLocal"),0),l=[],s=!0,u=!1,f=void 0;try{for(var v,p=function(e,n){var a=n.value;d+=1;var t='<div class="news-card '.concat("news-card--".concat(a.id)," grid grid-item-").concat(d,'">\n\n    <div class="top-wrap">\n      <img\n        src="').concat(a.image,'"\n        loading="lazy"\n        width="288"\n        height="395"\n        class="news-img"\n      />\n      <p class="isread ').concat("isread--".concat(a.id),'"></p>\n      <div class="category-wrap">\n        <p class="top-text">').concat(a.section,'</p>\n      </div>\n      <button class="favorite-btn ').concat("favorite-btn--".concat(a.id),'" data-id="').concat(a.id,'">\n        ').concat(c.removeFavoriteBtnHTML,'\n      </button>\n    </div>\n    <div class="info">\n      <h2 class="info-item">').concat(a.title,'</h2>\n      <p class="describe">').concat(a.description.slice(0,150)+"...",'</p>\n      <div class="lower-content">\n        <p class="news-date">').concat(a.date.slice(0,10).replaceAll("-","/"),'</p>\n        <a class="news-link ').concat("news-link--".concat(a.id),' link" href="').concat(a.url,'"  onclick="handleRead()" target="_blank">Read more</a>\n      </div>\n    </div>\n  </div>\n  \n');setTimeout((function(){var e=document.querySelector(".favorite-btn--".concat(a.id)),n=document.querySelector(".news-link--".concat(a.id)),t=document.querySelector(".isread--".concat(a.id)),i=document.querySelector(".news-card--".concat(a.id));console.log(e),console.log(n);var r=o.default.load("favorite");!0===(0,c.checkLokalStorage)(a,r)&&(e.innerHTML=c.removeFavoriteBtnHTML,e.classList.add("favorite-btn--active"));var d=o.default.load("readMoreLocal");!0===(0,c.checkLokalStorage)(a,d)&&(t.innerHTML=c.alreadyRead,i.classList.add("opacity")),e.onclick=(0,c.handleFavorite)(!0,a,e),n.onclick=(0,c.handleRead)(a,t,i)}),0),l.push(t)},h=r[Symbol.iterator]();!(s=(v=h.next()).done);s=!0)p(0,v)}catch(e){u=!0,f=e}finally{try{s||null==h.return||h.return()}finally{if(u)throw f}}i.insertAdjacentHTML("beforeend",l.join("")),t("fj9x3"),t("iRCFg");var w=document.querySelector(".mask");window.addEventListener("load",(function(){w.classList.add(".hide"),setTimeout((function(){w.remove()}),600)}))}();
//# sourceMappingURL=favorite.9794bbb7.js.map
