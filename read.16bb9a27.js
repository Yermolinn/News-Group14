!function(){function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a),a.register("iE7OH",(function(r,t){var n,a;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return a}),(function(e){return a=e}));var i={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)i[r[t]]=e[r[t]]},a=function(e){var r=i[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),a.register("aNJCr",(function(r,t){var n;e(r.exports,"getBundleURL",(function(){return n}),(function(e){return n=e}));var a={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n=function(e){var r=a[e];return r||(r=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),a[e]=r),r}})),a("iE7OH").register(JSON.parse('{"03q4W":"read.16bb9a27.js","ee16w":"sprite.f79beced.svg","aRedu":"read.97c45866.js"}'));var i,c=a("5OG1Q"),s=a("hqWnV"),d=(document.querySelector(".favorite-collection"),c.default.load("readMoreLocal"));i=a("aNJCr").getBundleURL("03q4W")+a("iE7OH").resolve("ee16w");new URL(i);var o=1,l=1,u=[];if(d){for(var g=0;g<d.length;g+=1){var p="https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering";0!==d[g].media.length&&(p=d[g].media[0]["media-metadata"][2].url);l&&u.push('<div class="read--date--card">\n        <div class="read--one--day">\n        <a class="read--date">'.concat(d[g].dayRead,'</a>\n        <svg class="read--contacts__svg" width="15px" height="9px"><use href="./sprite.f14d31f7.svg#icon-arrow-up"></use></svg>\n        <svg class="read--contacts__svg_hid read--is-hidden" width="15px" height="9px"><use href="./sprite.f14d31f7.svg#icon-arrow-down"></use></svg>\n        </div>\n         <div class= "read--day"> <div class="read--news-cards news-list">')),u.push('<div class="news-card '.concat("news-card--".concat(d[g].id)," grid grid-item-").concat(g,'">\n            <div class="top-wrap">\n              <img\n                src="').concat(p,'"\n                loading="lazy"\n                width="288"\n                height="395"\n                class="news-img"\n              />\n              <p class="isread ').concat("isread--".concat(d[g].id),'"></p>\n                <div class="category-wrap">\n                <p class="top-text">').concat(d[g].section,'</p>\n                </div>\n              <button class="favorite-btn ').concat("favorite-btn--".concat(d[g].id),'" data-id="').concat(d[g].id,'">\n                ').concat(s.addFavoriteBtnHTML,'\n              </button>\n            </div>\n            <div class="info">\n              <h2 class="info-item">').concat(d[g].title,'</h2>\n              <p class="describe">').concat(d[g].abstract,'</p>\n              <div class="lower-content">\n                <p class="news-date">').concat(d[g].published_date,'</p>\n                <a class="news-link ').concat("news-link--".concat(d[g].id),' link" href="').concat(d[g].url,'"  onclick="handleRead()" target="_blank">Read more</a>\n              </div>\n            </div>\n          </div>\n        ')),d.length<2?l=0:(o<d.length&&(l=Math.abs(d[g].dayRead.replace(/[\s.,%]/g,"")-d[o].dayRead.replace(/[\s.,%]/g,"")),o++),l&&u.push("</div> </div> </div>"))}document.querySelector(".read--cards").insertAdjacentHTML("beforeend",u.join(""));var f=document.querySelectorAll(".read--date--card"),h=!0,v=!1,m=void 0;try{for(var w,x=f[Symbol.iterator]();!(h=(w=x.next()).done);h=!0)el=w.value,el.addEventListener("click",(function(e){e.target.querySelector(".read--contacts__svg")&&(e.currentTarget.querySelector(".read--day").classList.toggle("read--is-hidden"),e.target.querySelector(".read--contacts__svg").classList.toggle("read--is-hidden"),e.target.querySelector(".read--contacts__svg_hid").classList.toggle("read--is-hidden"))}))}catch(e){v=!0,m=e}finally{try{h||null==x.return||x.return()}finally{if(v)throw m}}}else u.push('<section class="read--underfined">  <p class="read--underfined___title">We haven\'t found news from <br> this category</p> <picture> <source srcset="./src/images/img-error-mobile-x1.png 1x, ./src/images/img-error-mobile-x2.png 2x" type="image/png" media="(max-width: 479.98px)" alt="underfined-picture"> <source srcset="./src/images/img-error-tablet-x1.png 1x 1x, ./src/images/img-error-tablet-x2.png 2x" type="image/png" media="(max-width:767.98px)" alt="underfined-picture"> <source srcset="./src/images/img-error-x1.png 1x, ./src/images/img-error-x2.png 2x" type="image/png" media="(min-width: 1279.98px)" alt="underfined-picture"> <img class="read--underfined___picture" src="/goIt-news-team-project/mobile.9ca3fe39.png" alt="underfined-picture" width="248" height="198"> </picture>  </section>'),document.querySelector(".read--cards").insertAdjacentHTML("beforeend",u.join(""));a("bcAyb"),a("hIhpl"),a("hZqpd"),a("ak1PV"),a("2UeNT"),a("awokh"),a("1y1Ym"),a("hqWnV"),a("kSSsV"),a("iRCFg"),a("g7ckn"),a("dZyLz"),a("fj9x3")}();
//# sourceMappingURL=read.16bb9a27.js.map
