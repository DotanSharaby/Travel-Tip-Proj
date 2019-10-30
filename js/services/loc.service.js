'use strict';
export default {
    getPosition,
    connectToWeatherApi
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



// const QUERY_STRING = `http://api.openweathermap.org/data/2.5/`;
function connectToWeatherApi(lat, lng) {
    const API_WEATHER_KEY = 'a560842ebbafec0e712e1aef0039cc5b';
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_WEATHER_KEY}`)
}