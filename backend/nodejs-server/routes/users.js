const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/temp', (req, res) => {
    User.find()
        .then(users => res.json(users))
})

module.exports = router