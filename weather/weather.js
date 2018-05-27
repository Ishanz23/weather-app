const request = require('request');

const forecastKey = '9e8932efbae22df6ab3496fb7e20a8fa';

const getWeather = (location, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${forecastKey}/${location.latitude},${location.longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast.io server');
        } else if (response.code === 400) {
            callback(response.error);
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temparature: body.currently.temperature,
                realfeel: body.currently.apparentTemperature
            });
        }
    });
}

module.exports.getWeather = getWeather;