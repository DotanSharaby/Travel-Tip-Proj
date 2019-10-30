'use strict';
console.log('Main!');

import locService from './services/loc.service.js';
import mapService from './services/map.service.js';


window.onload = () => {
    let userPos;
    mapService.initMap()
        .then(() => {
            locService.getPosition()
                .then(pos => {
                    let loc = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    userPos = loc;
                    mapService.addMarker(loc, 'My Location');
                    console.log('User position is:', pos.coords);
                    
                    locService.connectToWeatherApi(loc.lat, loc.lng)
                        .then(({
                            data
                        }) => {
                            let res = {
                                cityName: data.name,
                                iconCode: data.weather[0].icon,
                                desc: data.weather[0].description,
                                minTemp: data.main.temp_min,
                                maxTemp: data.main.temp_max,
                                temp: data.main.temp,
                                windSpeed: data.wind.speed,
                                country: data.sys.country,
                            }
                            renderWeatherContainer(res);
                        });
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })
        .catch(console.log('INIT MAP ERROR'));
    document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
        mapService.panTo(userPos.lat, userPos.lng);
    })
}

function renderWeatherContainer(data) {
    let iconUrl = `http://openweathermap.org/img/wn/${data.iconCode}@2x.png`;
    const container = document.querySelector('.weather-container');
    let strHtmls = `
        <h3>Weather Today</h3>
        <img src="${iconUrl}"></img>
        <p>${data.cityName}, ${data.country}<img src="https://www.countryflags.io/${data.country}/flat/24.png"></p>
        <p style="background-color: grey; display: inline;">${data.temp} &#176;C </p><p>`;
    if (data.minTemp !== data.maxTemp) {
        strHtmls += `temperature from ${data.minTemp} to ${data.maxTemp} &#176;C,`;
    }
    strHtmls += ` wind ${data.windSpeed}km/ph</p>`;
    container.innerHTML = strHtmls;
}