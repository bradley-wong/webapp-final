const request = require('request');
const dotenv = require('dotenv');

dotenv.load();

var city_background = function(place){
    var dict_bg = {}
    var link = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${place}&image_type=photo`
    return new Promise((resolve, reject) => {
        request({
            url:link,
            json:true
        },
        (err, resp, body) => {
            if (parseInt(body.totalHits) == 0) {
                dict_bg = ["https://www.plant.ca/wp-content/uploads/2014/08/Beijingahenobarbus.jpg"]
            } else {
                dict_bg = [
                    body.hits[0].webformatURL,
                    body.hits[1].webformatURL,
                    body.hits[2].webformatURL,
                    body.hits[3].webformatURL
                ]
            }
            resolve(dict_bg)
        })
    })
}

module.exports = {
    city_background
}