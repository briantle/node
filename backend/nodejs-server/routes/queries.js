const express = require('express')
const router = express.Router()

const Query = require('../models/Query')

router.post('/', (req, res) => {
    const { email, query } = req.body

    const contactQuery = new Query();

    contactQuery.email = email
    contactQuery.query = query

    contactQuery.save()
        .then(newQuery => res.json(newQuery))
        .catch(err => res.status(400).json(err))
})

module.exports = router