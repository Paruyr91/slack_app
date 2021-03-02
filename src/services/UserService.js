const DB = require('../models/DB_associations')
const bcrypt = require('bcrypt')
const sendmail=require('../middlewares/nodemailer')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN_KEY
const fs=require('fs')

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
    async updateUser(user, body, file) {
         body.fullname? user.fullname= body.fullname:null
         body.displayname?user.displayname=body.displayname:null                
         body.whatIdo?user.whatIdo=body.whatIdo:null       
         body.phonenumber?user.phonenumber=body.phonenumber:null  
         if(file && user.profilimage){
            fs.unlink(user.profilimage.path,function(err){
                if(err)throw err
                console.log('file deleted')
            }) 
            user.profilimage=file
         }else if(file){
            user.profilimage=file
         }
        return user.save()
    } 

    async invaiteUser(user, body){
        let exist= await DB.Workspace.findOne({
            where:{ id:body.workspaceId},
            include: [{
                required:true,
                model:DB.User, 
                where:{
                    id:user.id
                },
                attributes : ['id']
              }]
        })
        if(exist && body.email){
            let token =jwt.sign({
                id:exist.id,
                uniqname:exist.uniqname,
                invaiter:user.email
            }, secret)
            let html=`<h1>you are invaited to Our Workspace By ${user.fullname}</h1>`
             sendmail(body.email,html,token)
        }else throw 'Woekcpace not found'
    }
}

module.exports = new UserService