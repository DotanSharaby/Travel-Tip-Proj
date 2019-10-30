var locs = [{lat: 11.22, lng: 22.11}]

function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
    getPosition: getPosition
}