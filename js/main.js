'use strict';
console.log('Main!');

import locService from './services/loc.service.js';
import mapService from './services/map.service.js';


locService.getLocs()
    .then(locs => console.log('locs', locs))


window.onload = () => {
    let userPos;
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            console.log(mapService);
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            userPos = pos.coords;
        })
        .catch(err => {
            console.log('err!!!', err);
        })


    document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        mapService.panTo(userPos.latitude, userPos.longitude);
    })
}