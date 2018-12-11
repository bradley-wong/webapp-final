const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const darksky = require('./darksky')
const pixabay = require('./pixabay')
const gmaps = require('./gmaps')

port = process.env.PORT || 8080;

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/views'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getTime', () => {
    date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    var time = new Date().toString();
    // console.log(time);
    next();
});

app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Index',
        name: 'Bradley Wong',
        studentNum: 'A00952188'
    });
});

app.post('/', (request, response) => {
    console.log(request.body)
});

app.get('/gallery', (request, response) => {
    place = 'vancouver';
    pixabay.city_background(place).then((result) => {
        console.log(result);
        response.send(`<h1>Gallery</h1><img src=${result[0]}><img src=${result[1]}><img src=${result[2]}><img src=${result[3]}>`)
    }).catch((error) => {
        response.send('Error: ', error);
    });

});

app.get('/weather', (request, response) => {
    place = 'vancouver'
    lat = 49.2827;
    lng = 123.1207;
	darksky.getWeather(lat, lng).then((result) => {
        response.send(`The temperature is ${result.temp} and is ${result.status} <img src="img/sunny.png">`);
	}).catch((error) => {
		response.send('Error: ', error);
	});
});

app.get('/404', (request, response) => {
    response.send('Page not found!');
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});