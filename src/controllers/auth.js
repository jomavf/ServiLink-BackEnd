import { DataResponse } from '../models/data-response'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import jwt from 'jsonwebtoken'

class AuthController {
    token(req, res, next) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)
        const dataResponse = new DataResponse()

        User.create(
            {
                username: req.body.username,
                password: hashedPassword
            }, (err, user) => {
                if (err) {
                    dataResponse.code = 400
                    dataResponse.message = err.message
                    console.log(`Error while creating user -> ${err}`)
                    return res.status(500).json(dataResponse)
                }
                const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400 // 24 hours
                })
                dataResponse.success = true
                dataResponse.code = 201
                dataResponse.message = 'Created successfully'
                dataResponse.item = { token }
                res.status(201).json(dataResponse)
            }
        )
    }
    getUsers(req, res, next) {
        const dataResponse = new DataResponse()
        User.find((err, data) => {
            if (err) {
                dataResponse.message = 'Error while getting data on the server'
                console.log(`Error while getting data from the database ${err}`)
                return res.status(500).json(dataResponse)
            }
            if (!data) {
                dataResponse.message = 'User not found'
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
    userById(req, res, next) {
        const id = req.params.id
        const dataResponse = new DataResponse()
        User.findOne({ _id: id }, (err, data) => {
            if (err) {
                dataResponse.message = 'Error while getting user on the server'
                console.log(`Error while getting user from the database ${err}`)
                return res.status(500).json(dataResponse)
            }
            if (!data) {
                dataResponse.message = 'User not found'
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
}
export default new AuthController()