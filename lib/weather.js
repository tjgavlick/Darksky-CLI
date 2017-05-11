const https = require('https'),
      http = require('http'),
      CONFIG = require('../config/apis.json');

// darksky api docs: https://darksky.net/dev/docs/forecast

function getWeather(locationData) {
    return new Promise((resolve, reject) => {
        try {
            const lat = locationData.geometry.location.lat,
                  long = locationData.geometry.location.lng,
                  request = https.get(`https://api.darksky.net/forecast/${CONFIG.darksky_key}/${lat},${long}?exclude=alerts,minutely,flags`, response => {
                if (response.statusCode === 200) {
                    let body = '';

                    response.on('data', chunk => body += chunk.toString());
                    response.on('end', () => {
                        let weatherData = JSON.parse(body);
                        resolve({
                            weather: weatherData,
                            location: locationData
                        });
                    });
                } else {
                    reject(`Zounds! The service returned with status code ${response.statusCode}: ${http.STATUS_CODES[response.statusCode]}`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getWeather: getWeather
}
