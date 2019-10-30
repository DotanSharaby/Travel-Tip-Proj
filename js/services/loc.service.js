'use strict';

export default {
    getPosition,
    API_KEY: 'a560842ebbafec0e712e1aef0039cc5b'
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}