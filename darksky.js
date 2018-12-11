const request = require('request');
const dotenv = require('dotenv');

dotenv.load();

var getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/` + encodeURIComponent(lat) + ',' + encodeURIComponent(lng),
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Darksky API');
            } else if (body.code == 400) {
                reject('The given location is invalid.');
            } else {
                resolve({
                    status: body.currently.summary,
                    temp: body.currently.temperature
                });
            }
        });
    });
};

module.exports = {
    getWeather
}