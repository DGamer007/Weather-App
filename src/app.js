const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { request } = require('http')
const geoLocation = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const public_dir = path.join(__dirname, '../public')    //Public Directory Path
const views_dir = path.join(__dirname, "../templates/views")    //views Directory Path
const partials_dir = path.join(__dirname, '../templates/partials')  //Partials Directory Path

const app = express()   //Instanciate 'express' module
const port = process.env.PORT || 3000;  //Port on which the app has been deployed

app.set('view engine', 'hbs')   //tells 'express' how to render things (which in this case - using 'hbs')
app.set('views', views_dir)     //tells 'express' where to find views directory or views
hbs.registerPartials(partials_dir)  //tells 'hbs' where to find partials

app.use(express.static(public_dir)) //Static root directory for project

app.get('', (req, res) => {         //app.get() method will get the req from first arguement which is a string 
    res.render('index', {           // and in this case it's empty...
        title: "Weather",           // The second arguement is a callback function, which has two arguements
        name: "DGamer"              // 1. req (that has been sent from 1st arguement of app.get() method)
    })                              // 2. res (response that we are gonna send back)
})  // res.render() method will call the view in 1st arguement and in 2nd arguement we can pass data to that view
//and response will be send back from where it has been asked

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

app.listen(port, () => {                            // app.listen() method will listen to requests made from 
    console.log("Server is up on Port:" + port);    // perticular port ID and of course that port ID will be the
});                                                 // same on which our app has been deployed        
