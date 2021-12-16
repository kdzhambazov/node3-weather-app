const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=85685da8480ea03a812066c71ffd87bc&query=${latitude},${longitude}&units=f`
    
    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect!')
        } else if(body.error) {
            callback(body.error.info)
        } else {
            const { weather_descriptions, temperature, precip } = body.current;
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degress out. There is a ' + precip + '% chance of rain.')            
        }      
    })
}

module.exports = forecast