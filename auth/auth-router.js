const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const db = require('../users/users-model')

const router = require('express').Router()

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db.add(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


router.post('/login', (req, res) => {
    const { password, username } = req.body;
    console.log(username)
    db.findBy(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getJwtToken(user.username)
                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token
                })
            } else {
                res.status(401).json({ message: "Invalid login" })
            }
        })
        .catch(error => {
            res.status(500).json({ Error: `${error} this is broken` })
        })
})

function getJwtToken(username) {
    const payload = {
        username,
        role: 'student'
    }

    const secret = process.env.JWT_SECRET || "This is a secret"

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}


module.exports = router;