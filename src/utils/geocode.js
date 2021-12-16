const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2VsbHZpbiIsImEiOiJja3dvMXIwZWIwbzN6MnJxdG42czdlbXI2In0.lyLhoqwXcfDcuRHInNwJ6w&limit=1`
    
    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect!')
        } else if(!body.features.length) {
            callback('Unable to find the location!')
        } else {
            const { place_name:location, center } = body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }      
    })
}

module.exports = geoCode