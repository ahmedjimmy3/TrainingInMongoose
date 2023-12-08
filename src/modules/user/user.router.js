import {Router} from 'express'
import * as userController from './user.controller.js'

const router = Router()

router.post('/signup' , userController.signup)
router.post('/signIn',userController.signIn)
router.put('/updateInfo',userController.updateInfo)
router.delete('/delUser', userController.deleteUser)
router.get('/listUsers', userController.listUsers)
router.get('/getUsers', userController.searchUserNameAndAge)
router.get('/searchUsersAge', userController.usersAge)
router.get('/oldestUsers', userController.oldestUsers)
router.get('/listOfIds', userController.listOfIds)

export default router