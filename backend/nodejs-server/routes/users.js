const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

router.get('/temp', (req, res) => {
    User.find()
        .then(users => res.json(users))
})
// When user clicks on register button
router.post("/register", (req, res) => 
{
    const {firstName, lastName, username, password} = req.body

    console.log(req.body)

    const user = new User()
    user.firstname = firstName
    user.lastname = lastName
    user.username = username
    user.password = password

    user.generatePasswordHash(user.password)

    user.save()
        .then(newUser => res.json(newUser.generateUserObject()))
        .catch(err => res.status(400).json(err))
})

router.post("/authenticate", (req, res) => 
{
    const {username, password} = req.body
    User.findOne({username: username})
        .then(user =>
        {
            // User exists in database
            if (user)
            {
                // Compare password
                if (user.comparePassword(password))
                    res.json(user.generateUserObject())
                else
                    res.status(401).json({msg: "Invalid Credentials: Invalid Password"})
            }
            else
            {
                res.status(401).json({msg: "Invalid Credentials: Invalid Username: [" + user.username + "]"})
            }
        })
})

module.exports = router