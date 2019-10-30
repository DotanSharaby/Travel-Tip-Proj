'use strict';
console.log('Main!');

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
                    // console.log('User position is:', pos.coords);
                    mapService.addMarker(loc, 'My Location');
                    
                    // weather obj should destructure it to a more relevant obj
                    console.log(locService.connectToWeatherApi(loc.lat, loc.lng));
                    addListeners(loc);
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })
        .catch(console.log('INIT MAP ERROR'));

    // EVENT LISTENERS
    function addListeners(loc) {
        document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
            // console.log('Aha!', ev.target);
            mapService.panTo(loc.lat, loc.lng);
        })

        document.querySelector('.loc-input-btn').addEventListener('click', (ev) => {
            var elLocInput = document.querySelector('.loc-input').value;
            console.log(elLocInput);
            mapService.panTo(loc.lat, loc.lng);
        })
    }
}