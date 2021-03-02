const express = require('express')
const router = express.Router()
const { signUp, signIn, updateUser,invaiteUser} = require('../controllers/UserController')
const {addWorkspace, getWorkspace,updateWorkspace,deleteWorkspace }=require('../controllers/WorkspaceController')
const {addChenal, getChenal, updateChenal, deleteChenal}=require('../controllers/ChenalController')
const checktoken = require('../middlewares/checktoken')


router.use(checktoken)

router.post('/signup', signUp)
router.post('/signin', signIn)
router.patch('/user/me', updateUser)
router.post('/user/invaite',invaiteUser)

router.post('/workspace', addWorkspace)
router.get('/workspace/:id', getWorkspace)
router.patch('/workspace/:id', updateWorkspace)
router.delete('/workspace/:id', deleteWorkspace)

router.post('/workspace/:spaceid/chenal', addChenal)
router.get('/workspace/:spaceid/chenal/:id', getChenal)
router.patch('/workspace/chenal/:id', updateChenal)
router.delete('/workspace/chenal/:id', deleteChenal)



module.exports = router   