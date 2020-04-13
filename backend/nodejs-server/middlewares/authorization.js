const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token, 'abcd1234');
        next();
    }
    catch (e) {
        res.status(401).json({
            msg: 'Not Authorized'
        })
    }
}

module.exports = auth