var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequired7c6=n),n("1EaU7"),n("aet5G"),n("jpOqa"),n("2pqRp"),n("53eoa"),n("eoOxN"),n("9B6Dv"),n("5tra8"),n("fa1Q4"),n("jN3nA"),n("cLrYZ"),n("hrXQ6"),n("6rEW5"),n("2s6iM");n("kEUo3").get;const i=document.querySelector(".weather-container"),r=document.querySelector(".more-weather-btn"),o=document.querySelector(".week-weather"),s=document.querySelector(".close-more-weather"),c=document.querySelector(".main-weather-info");let d=!1;async function l(e){d=!0;const t=e.coords.latitude,a=e.coords.longitude;try{const e=`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${a}&appid=a0572400057a18022ba680699689d40f&units=metric`,n=await fetch(e),i=await n.json();p(n,i),d&&r.addEventListener("click",(async function(){const e=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${a}&appid=a0572400057a18022ba680699689d40f&units=metric&cnt=49`,n=await fetch(e),i=await n.json();m(n,i),w()})),s.addEventListener("click",h)}catch(e){}}function h(){o.innerHTML="",s.classList.add("more-weather-is-hidden"),r.classList.remove("more-weather-is-hidden")}function w(){r.classList.add("more-weather-is-hidden"),s.classList.remove("more-weather-is-hidden")}function p(e,t){e.ok?(!function(e){const t=e.name,a=Math.round(e.main.temp),n=e.weather[0].main,i=e.weather[0].icon,r=`\n    <div class="weather-header">\n            <div class="weather-main">\n                <div class="weather-temp">${a}</div>\n                \n                <div class="additional-weather-info">\n                    <div class="weather-status">${n}</div>\n                    <div class="weather-city">\n                    \n                    <svg class="weather-icon-location" viewBox="0 0 24 32">\n             <path d="M12.16.881C5.603.889.289 6.202.28 12.759v.019c0 2.685.9 5.16 2.414 7.14l-.021-.028s.324.426.376.486l9.11 10.747 9.114-10.749c.047-.058.372-.483.372-.483l.001-.004a11.674 11.674 0 0 0 2.394-7.11v-.015.001C24.033 6.204 18.718.889 12.16.882h-.001zm0 16.199a4.32 4.32 0 1 1 0-8.642 4.32 4.32 0 1 1 0 8.64z"/>\n        </svg>\n                    ${t}</div>  \n                </div>\n                </div>\n            \n            <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${i}@2x.png" alt="${i}"></div>\n        </div>\n        <div class="weather-date">${new Date(1e3*e.dt).toLocaleDateString("en",{weekday:"short"})} <br> ${new Date(1e3*e.dt).toLocaleDateString("en-DE",{year:"numeric",month:"short",day:"numeric"})}</div>`;c.innerHTML=r}(t),r.classList.remove("more-weather-is-hidden")):i.innerHTML=t.message}function m(e,t){e.ok?function(e){const t=e.list.filter((e=>e.dt_txt.includes("12:00:00"))).map((e=>`<div class="weather-per-day">\n            <div class="weather-more-day">${new Date(1e3*e.dt).toLocaleDateString("en",{weekday:"short"})}</div>\n            <div class="weather-more-icon"><img src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="${e.weather[0].icon}"></div>\n            <div class="weather-more-temp">${Math.round(e.main.temp)}</div>\n        </div>`)).join(" ");o.innerHTML=t}(t):i.innerHTML=t.message}!async function(){try{const e="https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=a0572400057a18022ba680699689d40f&units=metric",t=await fetch(e),a=await t.json();p(t,a),r.addEventListener("click",(async function(e){r.classList.add("more-weather-is-hidden");if(!1===d){const e=await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=a0572400057a18022ba680699689d40f&units=metric&cnt=49"),t=await e.json();m(e,t),w()}})),s.addEventListener("click",h)}catch(e){}}(),navigator.geolocation.getCurrentPosition(l),n("iibg0"),n("dGOBj");
//# sourceMappingURL=index.fdb91bf4.js.map
