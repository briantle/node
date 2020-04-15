const express = require('express')
const router = express.Router()

const Query = require('../models/Query')

router.get("/", (req, res) => {
    Query.find()
        .then(queries => res.json(queries))
        .catch(err => res.status(400).json(err))
})

router.post('/add', (req, res) => {
    const { email, query } = req.body

    const contactQuery = new Query();

    contactQuery.email = email
    contactQuery.query = query

    contactQuery.save()
        .then(newQuery => res.json(newQuery))
        .catch(err => res.status(400).json(err))
})

module.exports = router