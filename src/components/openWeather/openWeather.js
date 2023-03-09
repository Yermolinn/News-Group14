const { get } = require("lodash");

 
const weatherContainer = document.querySelector('.weather-container');
const moreWeatherBtn = document.querySelector('.more-weather-btn');
const weekWeather = document.querySelector('.week-weather');
const closeMoreWeatherBtn = document.querySelector(".close-more-weather");
const mainWeatherInfo = document.querySelector('.main-weather-info')
const WEATHER_KEY = 'a0572400057a18022ba680699689d40f';
// const moreWatherContainer = document.querySelector('.weather-for-week'); 
// const newsList = document.querySelector('.news-list');

let flag = false;


function getGeo(params) {

 
    // const geoOptions = {
    //     enableHighAccuracy: true   
    // };

    
    // timeout           : 27000
    // maximumAge        : 30000,

    
    
    const currentPosition = navigator.geolocation.getCurrentPosition(weatherByGeo); 
    
        
        
        // , defaultWeather, geoOptions
    
    // if (navigator.geolocation) {
    //    await navigator.geolocation.getCurrentPosition(({ coords }) => {
    //         // const { latitude, longitude } = position.coords;
    //         // weatherContainer.innerHTML = ``;
    //         console.log(coords);
    //         weatherByGeo(coords.latitude, coords.longitude);
    //         // Show a map centered at latitude / longitude.
    //     });

    
    // };
};


async function weatherByGeo(position) {

    flag = true;
 
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        //  console.log(latitude);
        //  console.log(longitude);
    
    try {
        
      

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        getWeatherRender(response, data);
    
        // if (data.name !== defaultCityWeather) {
        
        if (flag) {
            moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);
        }
    
            async function onMoreWeatherBtnClick() {
                

                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric&cnt=49`;
                
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);

                getMoreWeatherRender(response, data);

                onMoreWeatherBtn();

            }

        closeMoreWeatherBtn.addEventListener('click', onCloseMoreWeatherBTn)
        } catch (error) {
            
        }    
        
};


async function defaultWeather() {

    
    const defaultCityWeather = 'Kyiv';
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCityWeather}&appid=${WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        getWeatherRender(response, data);

        
            moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);

        
    
        
            async function onMoreWeatherBtnClick(params) {
                
                moreWeatherBtn.classList.add('more-weather-is-hidden');


                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCityWeather}&appid=${WEATHER_KEY}&units=metric&cnt=49`;
                
                if (flag === false) {
                    const response = await fetch(url);
                    const data = await response.json();
                    // console.log(data);
                    getMoreWeatherRender(response, data);

                onMoreWeatherBtn();
                }

        }
        
        closeMoreWeatherBtn.addEventListener('click', onCloseMoreWeatherBTn);
    } catch (error) {
        
    }
    
        
        
};


function getWeather(data) {
    // console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
    const weatherDay = new Date(data.dt * 1000).toLocaleDateString('en', { weekday: 'short', });
    const weatherDate = new Date(data.dt * 1000).toLocaleDateString( 'en-DE', {year: 'numeric', month: 'short', day: 'numeric' });

    const info = `
    <div class="weather-header">
            <div class="weather-main">
                <div class="weather-temp">${temp}</div>
                
                <div class="additional-weather-info">
                    <div class="weather-status">${weatherStatus}</div>
                    <div class="weather-city">
                    
                    <svg class="weather-icon-location">
            <use href="/sprite.f14d31f7.svg#icon-location"></use>
        </svg>
                    ${location}</div>  
                </div>
                </div>
            
            <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherIcon}"></div>
        </div>
        <div class="weather-date">${weatherDay} <br> ${weatherDate}</div>`;
    
    // weatherContainer.insertAdjacentHTML("afterbegin", info);

    mainWeatherInfo.innerHTML = info;


    
};


function getMoreWeather(data) {
    // console.log(data);

    let filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    // console.log(filteredData);

    const moreWeather = filteredData.map((item) => 
        // const getMoreWeatherDate = new Date(item.dt * 1000).toLocaleDateString("en", {weekday: "long",});
        // const getMoreWeatherTemp = item.main.temp.toFixed(0);
        // const getMoreweatherIcon = item.weather[0].icon;

        `<div class="weather-per-day">
            <div class="weather-more-day">${new Date((item.dt * 1000)).toLocaleDateString("en", { weekday: "short", })}</div>
            <div class="weather-more-icon"><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].icon}"></div>
            <div class="weather-more-temp">${Math.round(item.main.temp)}</div>
        </div>`
        
        // hour: "numeric", hour12: false, minute: "numeric"
        
    ).join(' ');
    

    // weekWeather.insertAdjacentHTML("beforeend", moreWeather);
    weekWeather.innerHTML = moreWeather;
  
};

function onCloseMoreWeatherBTn() {
            
    weekWeather.innerHTML = "";
    closeMoreWeatherBtn.classList.add('more-weather-is-hidden');
    moreWeatherBtn.classList.remove('more-weather-is-hidden');
};

function onMoreWeatherBtn() {
    moreWeatherBtn.classList.add('more-weather-is-hidden');
    closeMoreWeatherBtn.classList.remove('more-weather-is-hidden');
};

function getWeatherRender(response, data) {
    if (response.ok) {
        getWeather(data);
        moreWeatherBtn.classList.remove('more-weather-is-hidden');
            
        } else {
        weatherContainer.innerHTML = data.message;
        }
};

function getMoreWeatherRender(response, data) {
    if (response.ok) {
            getMoreWeather(data);
            
            } else {
            weatherContainer.innerHTML = data.message;
            }
};


defaultWeather();

getGeo();
