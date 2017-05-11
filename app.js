const weather = require('./lib/weather'),
      geocoding = require('./lib/geocoding'),
      places = process.argv.slice(2);

function displayWeather(data) {
    console.log(`It's currently ${data.weather.currently.temperature} degrees outside in ${data.location.formatted_address}. Coming up, it looks like it will be ${data.weather.hourly.summary.toLowerCase()}`);
}

function displayError(e) {
    console.error(e);
}

places.forEach(place => {
    geocoding.lookup(place)
        .then(weather.getWeather)
        .then(displayWeather)
        .catch(displayError);
});
