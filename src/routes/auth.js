import express from 'express'
import authController from '../controllers/auth'
import { verifyToken } from '../middleware'

const router = express.Router()

router.route('/')
    .post(authController.token)
    .get(authController.getUsers)

router.route('/:id')
    .get(authController.userById)

router.route('/login')
    .post(authController.login)

export default router