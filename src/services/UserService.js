const DB=require('../models/DB_associations')

class UserService {
    
    signUp(body) {
       return  DB.User.create({
            password: body.password,
            email: body.email
        }).then(user=>{
            return {success: true,user:user}
        })


    }



}

module.exports= new UserService