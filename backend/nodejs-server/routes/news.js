const express = require('express')
const router = express.Router()

const News = require('../models/News')

router.get('/', (req, res) => {
    News.find()
        .then(news => res.json(news))
        .catch(err => res.status(400).json(err))
})

router.post('/add', (req, res) => {
    const { title, description, url, imgurl, publishedAt } = req.body

    const news = new News();

    news.title = title;
    news.description = description;
    news.url = url
    news.imgurl = imgurl
    // Should be in the format: yyyy-mm-dd (EX. 2001-04-16)
    news.publishedAt = new Date(publishedAt)

    news.save()
        .then(news => res.json(news))
        .catch(err => res.status(400).json(err))
})

router.get("/latestNews", (req, res) => {
    News.find().sort({publishedAt: "-1"}).limit(3).exec((err, news) => {
        res.json(news)
    })
})

router.delete("/:id", (req, res) => {
    News.findOneAndDelete({"id": req.params.id}, (err, result) => {
        res.send("Deleted")
    })
})

router.put("/:id", (req, res) => {
    const {title, description, publishedAt} = req.body
    const id = req.params.id

    News.findByIdAndUpdate({"id": id}
                            , {"title": title, "description": description, "publishedAt": publishedAt}
                            , (err, result) => {
                                if (err)
                                    res.send(err)
                                // This will show the matched record, not the updated one
                                else
                                    res.send(result)
                            })
})

module.exports = router