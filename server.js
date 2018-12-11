const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const darksky = require('./darksky')

port = process.env.PORT || 8080;

var app = express();

app.set('view engine', 'hbs');

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

app.get('/weather', (request, response) => {
    lat = 49.2827;
    lng = 123.1207;
	darksky.getWeather(lat, lng).then((result) => {
        response.send(`The temperature is ${result.temp} and is ${result.status}`);
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