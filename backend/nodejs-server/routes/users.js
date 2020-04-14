const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

router.get('/temp', (req, res) => {
    User.find()
        .then(users => res.json(users))
})
// When user clicks on register button
router.post("/register", (req, res) => {
    const {name, email, password} = req.body
    // This is temporary, don't know how you guys want the username to be made
    const username = email
    password = generatePasswordHash(password)

    const user = new User()
    user.name = name
    user.email = email
    user.username = username
    user.password = password

    user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))

})

function generatePasswordHash (password) {
    const salt = bcryptjs.genSaltSync(10)
    const passwordHash = bcryptjs.hashSync(password, salt);

    return passwordHash;
}

module.exports = router