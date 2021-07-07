const router = require('express').Router()

const userRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')

router.use('/users', userRouter)
router.use('/auth', authRouter)

router.get('/', (req, res) => {
    res.json('server is live')
})

module.exports = router;