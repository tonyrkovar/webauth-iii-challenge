const router = require('express').Router()
const verify = require('../auth/auth-middleware')

const db = require('./users-model');

router.get('/', verify, (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ Error: "There was an error on your request" })
        })
})


module.exports = router;