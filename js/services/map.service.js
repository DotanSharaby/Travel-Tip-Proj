'use strict';

export default{
    initMap,
    addMarker,
    panTo,
    codeAddress
}

var map;
var geocoder;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15,
                disableDoubleClickZoom: true
            })
            addMarker({ lat, lng }, 'Shukiyaj');
        })
}

function codeAddress(address) {
    var address = address;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
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
    const API_KEY = 'AIzaSyDYEGfFNs-ny8yRfSO_ZKXAOxzszay6K44';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}