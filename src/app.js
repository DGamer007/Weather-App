const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { request } = require('http')
const geoLocation = require('./utils/geoCode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000;

const public_dir = path.join(__dirname, '../public')
const views_dir = path.join(__dirname, "../templates/views")
const partials_dir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', views_dir)

hbs.registerPartials(partials_dir)

app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "DGamer"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "DGamer"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "DGamer"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Provide an Address."
        })
    }

    geoLocation.geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast.forecast(latitude, longitude, (error, { weather_description, current_temperature, feelsLike, precipitation }) => {

            if (error) {
                return res.send({ error })
            }


            return res.send({
                location,
                weather_description,
                current_temperature,
                feelsLike,
                precipitation
            })
        })
    });
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Provide search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('403', {
        error: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found"
    });
})

app.listen(port, () => {
    console.log("Server is up on Port:" + port);
});
