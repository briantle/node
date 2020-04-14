const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token, 'abcd1234')
        if (payload.username == "admin")
            next()
        else
        {
            res.status(401).json({
                msg: 'Not Authorized'
            })
        }
    }
    catch (e) {
        res.status(401).json({
            msg: 'Not Authorized'
        })
    }
}

module.exports = adminAuth