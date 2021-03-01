import  Router from 'express'
import checktoken from '../middlewares/checktoken.js'
import UserController from '../controllers/UserController.js'

const router = Router()



router.use(checktoken)

router.post('/signup', UserController.signUp)
 

export default router      