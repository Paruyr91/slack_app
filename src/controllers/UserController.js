const UserService = require('../services/UserService')
let upload = require('../middlewares/multer').single('image')
const multer = require('multer')

class UserController {

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

    async updateUser(req, res) {
        upload(req, res, async function (err) {
            try {
                if (err) throw err
                const user = await UserService.updateUser(req.user, req.body, req.file);
                return res.send(user);
            } catch (err) {
                console.log(err)
                return res.status(400).send({ success: false, error: err.message });
            }
        });
    }
    async invaiteUser(req,res){
        try {
            await UserService.invaiteUser(req.user, req.body);
            return res.send({ success: true});
        } catch (err) {
            return res.status(400).send({ success: false, error: err.message });
        }
    }

}

module.exports = new UserController