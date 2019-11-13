const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const secret = process.env.JWT_SECRET || "This is a secret"
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: 'Invalid request'
                })
            } else {
                req.decodedJwt = decoded;
                next()
            }
        })
    } else {
        res.status(400).json('You are not authorized')
    }
}