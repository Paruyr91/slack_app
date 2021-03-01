import DB from '../models/DB_associations.js'


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

export default new UserService