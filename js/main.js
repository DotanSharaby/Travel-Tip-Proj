'use strict';


import locService from './services/loc.service.js';
import mapService from './services/map.service.js';


window.onload = () => {
    mapService.initMap()
        .then(() => {
            locService.getPosition()
                .then(pos => {
                    let loc = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    mapService.addMarker(loc, 'My Location');

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
                    mapService.addMarker(loc, 'My Location');
                    addListeners(loc);
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })

    // EVENT LISTENERS \\

    function addListeners(loc) {
        document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
            mapService.panTo(loc.lat, loc.lng);
        })

        document.querySelector('.loc-input-btn').addEventListener('click', (ev) => {
            var elLocInput = document.querySelector('.loc-input').value;
            mapService.codeAddress(elLocInput);
        })

        document.querySelector('.clipborad-btn').addEventListener('click', (ev) => {
            copyLocation(loc);
        })
    }
}

function copyLocation(loc) {
    debugger;
    var url = `github.io/index.html?lat=${loc.lat}&lng=${loc.lng}`

    //  Copy the text inside the text field */
    document.execCommand("copy");
}

function renderWeatherContainer(data) {
    let iconUrl = `http://openweathermap.org/img/wn/${data.iconCode}@2x.png`;
    const container = document.querySelector('.weather-container');
    let strHtmls = `
        <h3>Weather Today</h3>
        <p>${data.cityName}, ${data.country}<img class="align-self-center" src="https://www.countryflags.io/${data.country}/flat/24.png"></p>
        <img src="${iconUrl}"></img>
        <h4>${data.desc}</h4>

        <p class="curr-temp">${data.temp} &#176;C </p><p>`;
    if (data.minTemp !== data.maxTemp) {
        strHtmls += `temperature from ${data.minTemp} to ${data.maxTemp} &#176;C,`;
    }
    strHtmls += ` wind ${data.windSpeed}km/ph</p>`;
    container.innerHTML = strHtmls;
}