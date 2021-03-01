const UserService=require('../services/UserService')


class UserController {
    constructor() {

    }


    async signUp(req, res) {


        try {
            const user = await UserService.signUp(req.body);
            return res.send(user);
        } catch (err) {
            return res.status(400).send({ success: false, error: err });
        }
    }



}

module.exports= new UserController