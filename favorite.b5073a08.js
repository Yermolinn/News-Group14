!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var c={id:e,exports:{}};return n[e]=c,t.call(c.exports,c,c.exports),c.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){a[e]=n},e.parcelRequired7c6=t),t("5OG1Q"),t("hqWnV"),t("bcAyb"),t("hIhpl"),t("hZqpd"),t("ak1PV"),t("2UeNT"),t("dZyLz"),t("5eH9L"),t("awokh");var c=t("5OG1Q"),o=t("hqWnV"),i=document.querySelector(".favorite-collection"),r=c.default.load("favorite"),d=(c.default.load("readMoreLocal"),0),l=[],s=!0,f=!1,u=void 0;try{for(var v,p=function(e,n){var a=n.value;d+=1;var t='<div class="news-card '.concat("news-card--".concat(a.id)," grid grid-item-").concat(d,'">\n\n    <div class="top-wrap">\n      <img\n        src="').concat(a.image,'"\n        loading="lazy"\n        width="288"\n        height="395"\n        class="news-img"\n      />\n      <p class="isread ').concat("isread--".concat(a.id),'"></p>\n      <div class="category-wrap">\n        <p class="top-text">').concat(a.section,'</p>\n      </div>\n      <button class="favorite-btn ').concat("favorite-btn--".concat(a.id),'" data-id="').concat(a.id,'">\n        ').concat(o.removeFavoriteBtnHTML,'\n      </button>\n    </div>\n    <div class="info">\n      <h2 class="info-item">').concat(a.title,'</h2>\n      <p class="describe">').concat(a.description.slice(0,150)+"...",'</p>\n      <div class="lower-content">\n        <p class="news-date">').concat(a.date.slice(0,10).replaceAll("-","/"),'</p>\n        <a class="news-link ').concat("news-link--".concat(a.id),' link" href="').concat(a.url,'"  onclick="handleRead()" target="_blank">Read more</a>\n      </div>\n    </div>\n  </div>\n  \n');setTimeout((function(){var e=document.querySelector(".favorite-btn--".concat(a.id)),n=document.querySelector(".news-link--".concat(a.id)),t=document.querySelector(".isread--".concat(a.id)),i=document.querySelector(".news-card--".concat(a.id)),r=c.default.load("favorite");!0===(0,o.checkLokalStorage)(a,r)&&(e.innerHTML=o.removeFavoriteBtnHTML,e.classList.add("favorite-btn--active"));var d=c.default.load("readMoreLocal");!0===(0,o.checkLokalStorage)(a,d)&&(t.innerHTML=o.alreadyRead,i.classList.add("opacity")),e.onclick=(0,o.handleFavorite)(!0,a,e),n.onclick=(0,o.handleRead)(a,t,i)}),0),l.push(t)},h=r[Symbol.iterator]();!(s=(v=h.next()).done);s=!0)p(0,v)}catch(e){f=!0,u=e}finally{try{s||null==h.return||h.return()}finally{if(f)throw u}}i.insertAdjacentHTML("beforeend",l.join("")),t("jOAfF"),t("fj9x3"),t("iRCFg"),t("5r1xk")}();
//# sourceMappingURL=favorite.b5073a08.js.map