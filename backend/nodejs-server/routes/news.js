const express = require('express')
const router = express.Router()

const News = require('../models/News')

router.get('/', (req, res) => {
    News.find()
        .then(news => res.json(news))
        .catch(err => res.status(400).json(err))
})

router.post('/add', (req, res) => {
    const { title, description } = req.body

    const news = new News();

    news.title = title;
    news.description = description;

    news.save()
        .then(news => res.json(news))
        .catch(err => res.status(400).json(err))
})

module.exports = router