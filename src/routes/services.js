import express from 'express'
import ServicesController from '../controllers/services'

const router = express.Router()

router.route('/')
    .get(ServicesController.services)
    .post(ServicesController.newService)

router.route('/:id')
    .get(ServicesController.serviceById)
    .patch(ServicesController.editServiceById)
    .delete(ServicesController.delete)

export default router