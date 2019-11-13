const express = require('express')
const session = require('express-session')
const KnexSessionStorage = require('connect-session-knex')(session)

const knexConnection = require("../data/db-config.js");
const apiRouter = require('./api-router')

const configureMiddleware = require('./configure-middleware.js')
const server = express()

const sessionConfigure = {
    name: "auth_1_Cookie",
    secret: process.env.COOKIE_SECRET || "Is this session valid?",
    cookie: {
        maxAge: 1000 * 60 * 45,
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 20,
        tablename: "user_sessions",
        sidfieldname: "id",
        createtable: true
    })
}

server.get('/sess', (req, res) => {
    res.status(200).json({ session: req.session })
})

configureMiddleware(server)
server.use(session(sessionConfigure))
server.use('/api', apiRouter)

module.exports = server;