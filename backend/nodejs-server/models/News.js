const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: {type: String, required: true},
    imgurl: {type: String, required: true},
    publishedAt: {type: Date, required: true}
}, {
    timestamps: true
})

const News = mongoose.model('News', NewsSchema)

module.exports = News