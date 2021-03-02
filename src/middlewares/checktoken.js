
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_TOKEN_KEY
const DB = require('../models/DB_associations')

module.exports = async function checktoken(req, res, next) {
    if (req.path === '/signin' || req.path === '/signup') {
        next()
    } else if (req.headers.authorization) {
        try {
            let [tokenname, token] = req.headers.authorization.split(' ')
            if (tokenname !== "Bearer") throw "Token is absent"
            let decoded = jwt.verify(token, secret)
            let user = await DB.User.findOne({
                where: { id: decoded.id }
            })
            if (user) {
                req.user = user
            } else {
                throw 'user not found'
            }
            return next()
        } catch (error) {
            console.log(error.message);
            if (error.message == "Signature verification failed") resolve(false);
            return res.status(301).send(error)
        }
    } else {
        res.status(301).send({
            name: "JsonWebTokenError",
            message: "Token is absent"
        })
    }
}