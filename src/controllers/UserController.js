const UserService = require('../services/UserService')
let upload = require('../middlewares/multer').single('image')

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

    async signIn(req, res) {
        try {
            const token = await UserService.signIn(req.body);
            return res.send(token);
        } catch (err) {
            return res.status(400).send({ success: false, error: err.message });
        }
    }
    async getUserbyId(req, res) {

        res.send(req.user)
    }

    async updateUser(req, res) {
        upload(req, res, async function (err) {
            try {
                if (err) throw err

                const user = await UserService.updateUser(req.user, req.body);
                return res.send(user);
            } catch (err) {
                return res.status(400).send({ success: false, error: err.message });
            }

        });



    }


}

module.exports = new UserController