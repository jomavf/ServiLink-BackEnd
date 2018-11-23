import Category from "../models/category";
import mongoose from "mongoose";
import User from "../models/user";
import { DataResponse } from "../models/data-response";

class CategoryController {
  listCategory(req, res, next) {
    const dataResponse = new DataResponse()
    Category.find((err,data)=>{
      if(err){
        dataResponse.message = 'Error while getting categories on the server'
        console.log(`Error while getting data from the database ${err}`)
        return res.status(500).json(dataResponse)
      }
      if (!data) {
        dataResponse.message = 'Categories not found'
        return res.status(404).json(dataResponse)
      }
      dataResponse.code = 201
      dataResponse.items = data
      dataResponse.message = 'OK'
      dataResponse.success = true
      dataResponse.total = data.length

      res.status(201).json(dataResponse)
    }).select({ hidden: 0, __v: 0 })
  }
  createCategory(req, res, next) {
    console.log(`El usuario encriptado es: ${req.user._id}`)
    if(req.user){
        User.findById(req.user._id)
        .then(user=>{
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const category = new Category({
                _id:new mongoose.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                urlToImage: req.body.urlToImage,
            })
            return category.save()
        }).then((data)=>{
            const dataResponse = new DataResponse()
            dataResponse.success = true
            dataResponse.code = 201
            dataResponse.message = 'Created successfully'
            dataResponse.item = data
            dataResponse.total = 1
            res.status(201).json(dataResponse)
        })
        .catch((err)=>{
            const dataResponse = new DataResponse()
            dataResponse.code = 500
            dataResponse.message = err.message
            console.log(`Error while creating category -> ${err}`)
            res.status(500).json(dataResponse)
        }) 
    }else{
        const error = new Error('Must be logged.')
        next(error)
    }
}
  deleteCategory(req, res, next) {
    const id = req.params.id
    const dataResponse = new DataResponse()

    Category.remove({_id:id})
    .exec()
    .then(result => {
        dataResponse.code = 200
        dataResponse.item = result
        dataResponse.message = 'OK'
        dataResponse.success = true
        res.status(200).send(dataResponse)
    })
    .catch(err => {
        console.log(err)
        dataResponse.code = 500
        dataResponse.message = err
        res.status(500).send(dataResponse)
    })
  }
}
export default new CategoryController()