import Service from '../models/service'
import { DataResponse } from '../models/data-response'

class ServicesController {
    newService(req, res, next) {
        const dataResponse = new DataResponse()
        Service.create(
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                urlToImage: req.body.urlToImage,
                date: Date.now()
            }, (err, data) => {
                if (err) {
                    dataResponse.code = 400
                    dataResponse.message = err.message
                    console.log(`Error while creating service -> ${err}`)
                    return res.status(500).json(dataResponse)
                }
                dataResponse.success = true
                dataResponse.code = 201
                dataResponse.message = 'Created successfully'
                dataResponse.item = data
                dataResponse.total = data.length
                res.status(201).json(dataResponse)
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
            dataResponse.items = data
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = data.length

            res.status(201).json(dataResponse)
        }).select({ hidden: 0, __v: 0 })
            .sort({ date: 'asc' })
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
            dataResponse.code = 201
            dataResponse.items = data
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = data.length

            res.status(201).json(dataResponse)
        })
    }
    editServiceById(req, res, next) {
        const id = req.params.id
        const dataResponse = new DataResponse()

        const newService = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            urlToImage: req.body.urlToImage,
            date: Date.now()
        }
        //Use findbyidandupdate if you fields must be necessary entried
        Service.findOneAndUpdate({ _id: id }, newService, (err, data) => {
            if (err) {
                dataResponse.message = 'Error while getting service on the server'
                console.log(`Error while getting service from the database ${err}`)
                return res.status(500).json(dataResponse)
            }
            if (!data) {
                dataResponse.message = 'Could not update service'
                return res.status(404).json(dataResponse)
            }
            dataResponse.code = 201
            dataResponse.items = newService
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = newService.length

            res.status(201).json(dataResponse)
        })
    }
}
export default new ServicesController()