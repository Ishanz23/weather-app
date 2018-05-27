const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address)
    .then(location => weather.getWeather(location)
        .then(temperature => console.log(temperature))
        .catch(err => console.error(err)))
    .catch(err => console.error(err));