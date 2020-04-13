const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    dayTemp: { type: Number },
    dayTempMin: { type: Number },
    dayTempMax: { type: Number },
    nightTemp: { type: Number },
    eveningTemp: { type: Number },
    morningTemp: { type: Number },
    description: { type: String }
})

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;