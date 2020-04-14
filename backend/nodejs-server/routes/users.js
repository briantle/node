const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (user) { 
                if (user.comparePassword(password)) {
                    res.json(user.generateUserObject())
                }
                else {
                    res.status(401).json({
                        msg: 'Invalid Credentials'
                    })
                }
            }
            else {
                res.status(401).json({
                    msg: 'Invalid Credentials'
                })
            }
        })
        .catch(err => res.status(400).json(err))
})

router.post('/register', (req, res) => {
    const { name, email, username, password } = req.body;

    const user = new User();

    user.name = name;
    user.email = email;
    user.username = username;
    user.generatePasswordHash(password);

    user.save()
        .then(newUser => {
            res.json(newUser.generateUserObject())
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;