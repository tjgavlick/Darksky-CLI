const https = require('https'),
      http = require('http'),
      CONFIG = require('../config/apis.json');

// google geocoding api: https://developers.google.com/maps/documentation/geocoding/start

function lookup(locationString, callback) {
    return new Promise((resolve, reject) => {
        try {
            locationString = locationString.replace(/\s/g, '+');
            const request = https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${CONFIG.gmaps_key}`, response => {
                if (response.statusCode === 200) {
                    let body = '';

                    response.on('data', chunk => body += chunk.toString());
                    response.on('end', () => {
                        let locationData = JSON.parse(body);
                        if (!locationData || locationData.results.length === 0) {
                            reject(`Unable to find location: ${locationString}`);
                        } else {
                            let result = locationData.results[0];
                            resolve(result);
                        }
                    });

                } else {
                    reject(`Aw, fiddlesticks. The service returned with status code ${response.statusCode}: ${http.STATUS_CODES[response.statusCode]}`);
                }
            });
        } catch (e) {
            reject(`Oh no! ${e.message}`);
        }
    });
}

module.exports = {
    lookup: lookup
}
