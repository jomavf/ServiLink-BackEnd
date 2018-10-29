import Service from '../models/service'
import { DataResponse } from '../models/data-response'
import mongoose from 'mongoose'
import User from '../models/user'

class ServicesController {
    newService(req, res, next) {
        User.findById(req.body.userId)
        .then((user)=>{
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const service = new Service({
                _id:new mongoose.Types.ObjectId(),
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                urlToImage: req.body.urlToImage,
                user: req.body.userId,
                date:Date.now()
            })
            return service.save()
        }).then((data)=>{
            const dataResponse = new DataResponse()
            dataResponse.success = true
            dataResponse.code = 201
            dataResponse.message = 'Created successfully'
            dataResponse.item = {
                 _id:data._id,
                title:data.title,
                description: data.description,
                price: data.price,
                urlToImage: data.urlToImage,
                date: data.date,
                user:data.user,
                request: {
                    type:'GET',
                    url:`http://${process.env.HOST}:${process.env.PORT}/service/${data._id}`
                }
            }
            dataResponse.total = 1
            res.status(201).json(dataResponse)
        })
        .catch((err)=>{
            const dataResponse = new DataResponse()
            dataResponse.code = 500
            dataResponse.message = err.message
            console.log(`Error while creating service -> ${err}`)
            res.status(500).json(dataResponse)
        }) 
    }
    services(req, res, next) {
        const dataResponse = new DataResponse()
        Service.find((err, data) => {
            if (err) {
                dataResponse.message = 'Error while getting data on the server'
                console.log(`Error while getting data from the database ${err}`)
                return res.status(500).json(dataResponse)
            }
            if (!data) {
                dataResponse.message = 'Service not found'
                return res.status(404).json(dataResponse)
            }
            dataResponse.code = 201
            dataResponse.items = data.map(service =>{
                return {
                    _id:service._id,
                    title:service.title,
                    description: service.description,
                    price: service.price,
                    urlToImage: service.urlToImage,
                    date: service.date,
                    user:service.user,
                    request: {
                        type:'GET',
                        url:`http://${process.env.HOST}${process.env.ENV==="dev"?":"+process.env.PORT:''}/service/${service._id}`
                    }
                }
            })
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = data.length

            res.status(201).json(dataResponse)
        }).select({ hidden: 0, __v: 0 })
            .sort({ date: 'desc' })
    }
    serviceById(req, res, next) {
        const id = req.params.id
        const dataResponse = new DataResponse()

        Service.findOne({ _id: id }, (err, data) => {
            if (err) {
                dataResponse.message = 'Error while getting service on the server'
                console.log(`Error while getting service from the database ${err}`)
                return res.status(500).json(dataResponse)
            }
            if (!data) {
                dataResponse.message = 'Service not found'
                return res.status(404).json(dataResponse)
            }
            dataResponse.code = 200
            dataResponse.items = data
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = 1

            res.status(201).json(dataResponse)
        }).select({hidden:0 , __v:0})
    }
    editServiceById(req, res, next) {
        const id = req.params.id
        const dataResponse = new DataResponse()
        const updateOps = {}
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value
        }
        console.log(updateOps)
        Service.update({_id:id},{$set:updateOps})
        .exec()
        .then((result)=>{
            dataResponse.code = 200
            dataResponse.item = {
                request: {
                    type:'GET',
                    url:`http://${process.env.HOST}:${process.env.PORT}/service/${id}`
                }
            }
            dataResponse.message = 'Service updated'
            dataResponse.success = true
            res.status(200).json(dataResponse)
        })
        .catch((err)=>{
            dataResponse.code = 500
            dataResponse.message = err.message
            res.status(500).json(dataResponse)
        })
    }
    delete(req,res,next){
        const id = req.params.id
        const dataResponse = new DataResponse()

        Service.remove({_id:id})
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
export default new ServicesController()