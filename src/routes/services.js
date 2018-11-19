import express from 'express'
import ServicesController from '../controllers/services'
import {verifyToken} from '../middleware'

const router = express.Router()

router.route('/')
    .get(ServicesController.services)
    .post(verifyToken,ServicesController.newService)

router.route('/:id')
    .get(ServicesController.serviceById)
    .patch(verifyToken,ServicesController.editServiceById)
    .delete(verifyToken,ServicesController.delete)

export default router