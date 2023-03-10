const { get } = require("lodash");

 
const weatherContainer = document.querySelector('.weather-container');
const moreWeatherBtn = document.querySelector('.more-weather-btn');
const weekWeather = document.querySelector('.week-weather');
const closeMoreWeatherBtn = document.querySelector(".close-more-weather");
const mainWeatherInfo = document.querySelector('.main-weather-info')
const WEATHER_KEY = 'a0572400057a18022ba680699689d40f';

let flag = false;


function getGeo(params) {
    
    const currentPosition = navigator.geolocation.getCurrentPosition(weatherByGeo); 
};


async function weatherByGeo(position) {

    flag = true;
 
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
    try {
        
      

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        getWeatherRender(response, data);
    
        
        if (flag) {
            moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);
        }
    
            async function onMoreWeatherBtnClick() {
                

                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric&cnt=49`;
                
                const response = await fetch(url);
                const data = await response.json();

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
                    
                    <svg class="weather-icon-location" viewBox="0 0 24 32">
             <path d="M12.16.881C5.603.889.289 6.202.28 12.759v.019c0 2.685.9 5.16 2.414 7.14l-.021-.028s.324.426.376.486l9.11 10.747 9.114-10.749c.047-.058.372-.483.372-.483l.001-.004a11.674 11.674 0 0 0 2.394-7.11v-.015.001C24.033 6.204 18.718.889 12.16.882h-.001zm0 16.199a4.32 4.32 0 1 1 0-8.642 4.32 4.32 0 1 1 0 8.64z"/>
        </svg>
                    ${location}</div>  
                </div>
                </div>
            
            <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherIcon}"></div>
        </div>
        <div class="weather-date">${weatherDay} <br> ${weatherDate}</div>`;
    


    mainWeatherInfo.innerHTML = info;


    
};


function getMoreWeather(data) {


    let filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00'));


    const moreWeather = filteredData.map((item) => 

        `<div class="weather-per-day">
            <div class="weather-more-day">${new Date((item.dt * 1000)).toLocaleDateString("en", { weekday: "short", })}</div>
            <div class="weather-more-icon"><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].icon}"></div>
            <div class="weather-more-temp">${Math.round(item.main.temp)}</div>
        </div>`
        
        
    ).join(' ');
    
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
