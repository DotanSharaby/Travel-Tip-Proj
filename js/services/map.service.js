'use strict';

export default {
    initMap,
    addMarker,
    panTo,
}

var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    // console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            // console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15,
                disableDoubleClickZoom: true
            })
            // console.log('Map!', map);
            addMarker({ lat, lng }, 'init pos');
        })
}

function addMarker(loc, title) {
    var marker = new google.maps.Marker({
        position: loc,
        map,
        title
    });
    marker.addListener('dblclick', () => {
        marker.setMap(null);
    })
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
    map.setZoom(15);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyA3sAXURmXysD2efUpObkZrYSYvvN2W7GE';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}