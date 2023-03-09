
 
const weatherContainer = document.querySelector('.weather-container');
const moreWeatherBtn = document.querySelector('.more-weather-btn');
const moreWatherContainer = document.querySelector('.weather-for-week'); 
const weekWeather = document.querySelector('.week-weather');
const closeMoreWeatherBtn = document.querySelector(".close-more-weather");
const newsList = document.querySelector('.news-list')
const WEATHER_KEY = 'a0572400057a18022ba680699689d40f';


   

// function loadWeather(params) {

//     // if (navigator.geolocation) {
//     //     getGeo();
//     // };
    

    
//     // getGeo();

// //     if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(({coords}) => {
// //             // const { latitude, longitude } = position.coords;
// //             console.log(coords);
// //             weatherByGeo(coords.latitude, coords.longitude)
// //   // Show a map centered at latitude / longitude.
// //         });
        
// //     };
// //     defaultWeather();



    
    

//     // if (navigator.geolocation) {
//     //     getGeo();
//     // };
    
//     //     defaultWeather();

    

//     // getGeo(params);

//     // const currentPosition = navigator.geolocation.getCurrentPosition(weatherByGeo, defaultWeather, geoOptions);

//     // if (navigator.geolocation) {
//     //     navigator.geolocation.getCurrentPosition({ coords: { latitude, longitude } })
//     // }
// };
    // weatherContainer.innerHTML = `<div class="loading"><img src="./Spinner-1s-200px.gif" alt="Loading"></div>`;

async function getGeo(params) {

 
    const geoOptions = {
        enableHighAccuracy: true   
    };
    
    
    // timeout           : 27000
    // maximumAge        : 30000,
    // defaultWeather();
    
    // if (navigator.geolocation) {
    // weekWeather.innerHTML = ``;
       const currentPosition = await navigator.geolocation.getCurrentPosition(weatherByGeo, defaultWeather, geoOptions)

    
    // };
        


    
    // if (navigator.geolocation) {
    //    await navigator.geolocation.getCurrentPosition(({ coords }) => {
    //         // const { latitude, longitude } = position.coords;
    //         // weatherContainer.innerHTML = ``;
    //         console.log(coords);
    //         weatherByGeo(coords.latitude, coords.longitude);
    //         // Show a map centered at latitude / longitude.
    //     });

    
    // };
}

async function weatherByGeo(position) {
 
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        //  console.log(latitude);
        //  console.log(longitude);

        // const key = 'a0572400057a18022ba680699689d40f';

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        getWeatherRender(response, data);
        // if (response.ok) {
        //     getWeather(data);
            
        // } else {
        // weatherContainer.innerHTML = data.message;
        // }


        moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);

            async function onMoreWeatherBtnClick() {
                // console.log(5);
                
                
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric&cnt=49`;
                // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${MORE_WEATHER_KEY}&units=metric`;
                
                const response = await fetch(url);
                const data = await response.json();
                // console.log(data);

                getMoreWeatherRender(response, data);

                // if (response.ok) {
                // getMoreWeather(data);
                
                // } else {
                // weatherContainer.innerHTML = data.message;
                // }

                onMoreWeatherBtn();

                // moreWeatherBtn.classList.add('more-weather-is-hidden');
                // closeMoreWeatherBtn.classList.remove('more-weather-is-hidden');

            }

        closeMoreWeatherBtn.addEventListener('click', onCloseMoreWeatherBTn)
        
        // function onCloseMoreWeatherBTn(params) {
            
        //     weekWeather.innerHTML = "";
        //     closeMoreWeatherBtn.classList.add('more-weather-is-hidden');
        //     moreWeatherBtn.classList.remove('more-weather-is-hidden');
        // }
};

// function errorGeo(params) {
//     return;
// };

async function defaultWeather() {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${WEATHER_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        getWeatherRender(response, data);


        moreWeatherBtn.addEventListener('click', onMoreWeatherBtnClick);

        async function onMoreWeatherBtnClick(params) {
            // console.log(5);
            moreWeatherBtn.classList.add('more-weather-is-hidden');

            
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=${WEATHER_KEY}&units=metric&cnt=49`;
            
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);

            getMoreWeatherRender(response, data);

            onMoreWeatherBtn();

        }

        closeMoreWeatherBtn.addEventListener('click', onCloseMoreWeatherBTn)
        
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
    
    weatherContainer.insertAdjacentHTML("afterbegin", info);
    


    
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
    

    weekWeather.insertAdjacentHTML("beforeend", moreWeather);
  
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

// if (weatherContainer) {
//     loadWeather();
// };
        


// if (navigator.geolocation) {
//     getGeo();
// };

// weekWeather.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

getGeo();

