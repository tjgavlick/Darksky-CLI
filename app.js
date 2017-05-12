const weather = require('./lib/weather'),
      geocoding = require('./lib/geocoding'),
      places = process.argv.slice(2),
      DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function displayWeather(data) {
    // displays quick information about right now followed by rows of
    // hourly temperatures

    let previousDay = null,
        hourlyData = new Map();

    console.log(`\nIt's currently ${data.weather.currently.temperature} degrees outside in ${data.location.formatted_address} (feels like ${data.weather.currently.apparentTemperature} degrees).`);
    console.log(`Coming up, it looks like it will be ${data.weather.hourly.summary.toLowerCase()}`);

    // loop over hours
    data.weather.hourly.data.forEach(hour => {
        let moment = new Date(parseInt(hour.time) * 1000);  // darksky returns s, not ms

        // break up by day, and give each day a heading
        if (moment.getDate() !== previousDay) {
            // if we have any hourly data stored, write it then empty the storage
            if (hourlyData.size > 0) {
                writeHourlyDisplay(hourlyData);
                hourlyData.clear();
            }
            // write the day heading
            console.log(`\n${DAYS[moment.getDay()]}, ${MONTHS[moment.getMonth()]} ${moment.getDate()}`);
        }

        hourlyData.set(moment.getHours(), parseInt(hour.temperature, 10));
        previousDay = moment.getDate();
    });

    // write remaining hours
    writeHourlyDisplay(hourlyData);
}


function writeHourlyDisplay(data) {
    let flagString = '',
        tempString = '',
        timeString = '';
    const pad = 7;

    // find keys for the min and max temperatures before writing
    let keys = Array.from(data.keys());
    let minHour = keys.reduce((acc, cur) => data.get(acc) > data.get(cur) ? cur : acc);
    let maxHour = keys.reduce((acc, cur) => data.get(acc) < data.get(cur) ? cur : acc);

    data.forEach((temp, hour) => {
        if (hour === minHour) {
            flagString += '(lo)'.padEnd(pad);
        } else if (hour === maxHour) {
            flagString += '(hi)'.padEnd(pad);
        } else {
            flagString += ''.padEnd(pad);
        }
        tempString += Math.round(temp).toString().padEnd(pad);
        timeString += (hour + ':00').padEnd(pad);
    })
    console.log(flagString);
    console.log(tempString);
    console.log(timeString);
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
