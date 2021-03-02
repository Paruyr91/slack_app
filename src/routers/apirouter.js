const express = require('express')
const router = express.Router()
const { signUp, signIn, getUserbyId, updateUser } = require('../controllers/UserController')
const checktoken = require('../middlewares/checktoken')
const upload = require('../middlewares/multer')


router.use(checktoken)

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/user/:id', getUserbyId)
router.patch('/user/me', updateUser)



module.exports = router   