import express from 'express'
import CategoryController from '../controllers/category'
import {verifyToken} from '../middleware'

const router = express.Router()

router.route('/')
    .get(verifyToken,CategoryController.listCategory)
    .post(verifyToken,CategoryController.createCategory)

router.route('/:id')
    .delete(verifyToken,CategoryController.deleteCategory)

export default router