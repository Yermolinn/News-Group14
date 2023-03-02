
 
const weatherContainer = document.querySelector('.weather-container');
const moreWeatherBtn = document.querySelector('.more-weather-btn');
const moreWatherContainer = document.querySelector('.weather-for-week'); 
const weekWeather = document.querySelector('.week-weather');

    

async function loadWeather(params) {

    async function geoSuccess(position) {
 
        const latitude  = position.coords.latitude;
         const longitude = position.coords.longitude;
        //  console.log(latitude);
        //  console.log(longitude);

        const key = 'a0572400057a18022ba680699689d40f';

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            getWeather(data);
            
        } else {
        weatherContainer.innerHTML = data.message;
        }


        moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);


        async function onMoreWeatherBtnClick(params) {
            console.log(5);
            moreWeatherBtn.classList.add('more-weather-is-hidden');

            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&cnt=49&exclude=current,minutely,hourly,alerts`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (response.ok) {
            getMoreWeather(data);
            
            } else {
            weatherContainer.innerHTML = data.message;
            }

        }

         
    }

        function geoError() {
        alert("No Geo");
        }

        const geoOptions = {
        enableHighAccuracy: true
        
        
    };
    
    // timeout           : 27000
    // maximumAge        : 30000,

    const wpid = navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

}
    // weatherContainer.innerHTML = `<div class="loading"><img src="./Spinner-1s-200px.gif" alt="Loading"></div>`;


function getWeather(data) {
    // console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    // const feelsLike = Math.round(data.main.feels_like);
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
    
    // weatherContainer.innerHTML = info;
    weatherContainer.insertAdjacentHTML("afterbegin", info);


    
};


if (weatherContainer) {
    loadWeather();
};


function getMoreWeather(data) {
    // console.log(data);

    let filteredData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    console.log(filteredData);

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
    

    weekWeather.insertAdjacentHTML("beforeend", moreWeather);
  
}