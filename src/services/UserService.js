const DB = require('../models/DB_associations')
const bcrypt = require('bcrypt')
// const sendmail=require('../authservice/nodemailer')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN_KEY

class UserService {

    signUp(body) {
        let fullname = body?.email?.split('@')
        return DB.User.create({
            password: body.password,
            email: body.email,
            fullname: fullname[0]
        }).then(user => {
            return { success: true }
        })
    }

    async signIn(body) {
        let user = await DB.User.findOne({
            where: { email: body.email }
        })
        if (user) {
            if (!bcrypt.compareSync(body.password, user.dataValues.password)) {
                throw new Error('enter curect password');
            } else {
                return {
                    token: jwt.sign({
                        id: user.id,
                        email: user.email
                    }, secret, {
                        expiresIn: '2h'
                    }),
                    user: {
                        id: user.id,
                        fullname: user.fullname,
                        displayname: user.displayname,
                        whatIdo: user.whatIdo,
                        phonenumber: user.phonenumber,
                        profilimage: user.profilimage
                    }
                }
            }
        } else {
            throw new Error('enter currect Email');
        }
    }
    async updateUser(user, body) {

        return user

    }



}

module.exports = new UserService