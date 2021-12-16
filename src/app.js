const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths.
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configure hendelbars engine and views location.
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

// Configure express static directory to serve.
app.use(express.static(publicPath))

// Routing.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Udemy node cource'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Udemy node cource'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Udemy node cource',
        helperText: 'Some helper text'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query

    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }


    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send(error);
        }
    
        forecast(latitude, longitude, (error, forecastData = '') => {
            if(error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Udemy node cource',
        errorMessage: 'Help artical not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Udemy node cource',
        errorMessage: 'No such address'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})