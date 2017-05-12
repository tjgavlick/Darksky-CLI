# Darksky-CLI

First day learning js outside of the browser! This cute little application gets the current temperature and a brief forecast from the darksky forecast API. To run, insert your API keys for Google Maps and Darksky into `/config/apis.json`, then pass your location search(es) as command line arguments.

`node app.js Pittsburgh`

`node app.js "Portland, ME" Tucson 90210`

If running Node versions 7.5 or 7.10, run with the `--harmony` flag, because I'm not reimplementing string padding.

[Powered by Dark Sky](https://darksky.net/poweredby/)
