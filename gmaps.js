const request = require('request')
const dotenv = require('dotenv');

dotenv.load();

var getAddress = (place) => {
    return new Promise((resolve, reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject(error);
			} else if (body.status === 'OK') {
				resolve({
					lng: body.results[0].geometry.location['lng'],
					lat: body.results[0].geometry.location['lat']
				})
			};
		});
	});
}

module.exports = {
    getAddress
}