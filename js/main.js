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
                    let loc = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    mapService.addMarker(loc, 'My Location');
                    console.log('User position is:', pos.coords);
                    userPos = pos.coords;
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })
        .catch(console.log('INIT MAP ERROR'));

    // EVENT LISTENERS
    document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        mapService.panTo(userPos.latitude, userPos.longitude);
    })

}