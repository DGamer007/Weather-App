const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=31e5d39b88c7f4981d20614b7c46549e&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to establish Connection.", undefined);
        }
        else if (body.error) {
            callback("Provide valid location.", undefined);
        }
        else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                current_temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                precipitation: body.current.precip
            })
        }

    })
}

module.exports = { forecast: forecast };