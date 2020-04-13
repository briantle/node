const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
})

const Sport = mongoose.model('Sport', SportSchema);

module.exports = Sport;