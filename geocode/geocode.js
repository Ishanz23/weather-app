const request = require('request');

const geolocationApiKey = 'AIzaSyApHHXHzuvjd3DFnCEzyNcqsyT3Nyo4LG4';

const geocodeAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geolocationApiKey}`,
            json: true,
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject(`Unable to find address => ${address}`);
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        });
    });
};

module.exports.geocodeAddress = geocodeAddress;