const router = require('express').Router()

router.get('/', (req, res) => {
    res.json('server is live')
})

module.exports = router;