const express = require('express')
const router= express.Router()
const UserController=require('../controllers/UserController')
const checktoken=require('../middlewares/checktoken')

 


router.use(checktoken)

router.post('/signup', UserController.signUp)
 
module.exports=router   