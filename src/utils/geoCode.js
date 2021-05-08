const request = require('request');

const geoCode = (address, callback) => {
    //This URL is from Mapbox Geocoding API
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGdhbWVyIiwiYSI6ImNrb2FkenEwNzBjZ2UydnFtOHBtczJuaGQifQ.tb28JXO6IqvvDBwkh1qk0Q&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to establish Connection.", undefined);
        }
        else if (body.features.length === 0) {
            callback("Provide valid location.", undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = { geoCode: geoCode }