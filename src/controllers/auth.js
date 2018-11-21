import { DataResponse } from '../models/data-response'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Joi from 'joi'

const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(10).max(30).required(),
    password: Joi.string().trim().min(10).required(),
    firstname: Joi.string().allow('').optional(),
    lastname: Joi.string().allow('').optional(),
    age: Joi.number().allow('').optional(),
    mail: Joi.string().allow('').optional(),
    avatar: Joi.string().allow('').optional(),
    role:Joi.string().allow('').optional(),
    registeredServices:Joi.array().allow('').optional()
})

class AuthController {
    token(req, res, next) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)
        const dataResponse = new DataResponse()

        const result = Joi.validate(req.body , schema)
        if(result.error === null){
            //Make sure username is unique
            User.findOne({username:req.body.username})
            .then(user =>{
                if(user){
                    const error =  new Error('The username is not available. Please choose another one.')
                    res.status(409)
                    next(error)
                }else{
                    User.create(
                        {
                            _id:new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hashedPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.firstname,
                            age: req.body.age,
                            telephone: req.body.telephone,
                            registeredServices: req.body.registeredServices,
                            mail: req.body.mail,
                            avatar: req.body.avatar,
                            role: req.body.role,
                        }, (err, user) => {
                            if (err) {
                                dataResponse.code = 400
                                dataResponse.message = err.message
                                console.log(`Error while creating user -> ${err}`)
                                return res.status(500).json(dataResponse)
                            }
                            const token = jwt.sign({ _id: user._id, username:user.username }, process.env.SECRET, {
                                expiresIn: '1d' 
                            })
                            dataResponse.success = true
                            dataResponse.code = 201
                            dataResponse.message = 'Created successfully'
                            dataResponse.item = { token:token , userId:user._id }
                            res.status(201).json(dataResponse)
                        }
                    )
                }
            })
        }else{ 
            
            res.status(422)
            next(result.error)
        }
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
        User.findById(id)
        .select({ hidden: 0, __v: 0,password:0})
        .exec()
        .then((data)=>{
            if(data){
                dataResponse.code = 201
                dataResponse.items = data
                dataResponse.message = 'OK'
                dataResponse.success = true
                dataResponse.total = data.length
                res.status(201).json(dataResponse)
            }else{
                dataResponse.code = 400
                dataResponse.message = 'User not found'
                return res.status(404).json(dataResponse)
            }
        })
        .catch((err)=>{
            dataResponse.code = 500
            dataResponse.message = err.message
            res.status(500).json(dataResponse)
        })
    }

    login(req,res,next){
        const result = Joi.validate(req.body , schema)
        if(result.error === null){
            User.findOne({username:req.body.username})
            .then((user)=>{
                if(user){
                    bcrypt.compare(req.body.password,user.password).then((result)=>{
                        if(result === true){
                            
                            const payload = {
                                _id:user._id,
                                username:user.username
                            }
                            jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'},(err,token)=>{
                                if(err){
                                    res.status(422)
                                    const error = new Error('Unable to login')
                                    next(error)
                                }else{
                                    res.json({
                                        token:token,
                                        _id:user._id
                                    })
                                }
                            })
                        }else{
                            res.status(422)
                            const error = new Error('Unable to login')
                            next(error)
                        }
                    })
                }else{
                    res.status(422)
                    const error = new Error('Unable to login')
                    next(error)
                }
            }).catch(err=>{
                res.status(422)
                const error = new Error('Unable to login')
                next(error)
            })
        }
        else{
            res.status(422)
            const error = new Error('Unable to login')
            next(error)
        }
    }
    getUserByToken(req,res,next){
        User.findOne({_id:req.user._id})
        .then((user)=>{
            const dataResponse = new DataResponse()
            dataResponse.code = 201
            dataResponse.items = {_id:user._id}
            dataResponse.message = 'OK'
            dataResponse.success = true
            dataResponse.total = 1
            res.status(201).json(dataResponse)
        })
        .catch(err=>{
            console.log(err)
            res.status(422)
            const error = new Error('Unable to login')
            next(error)
        })
    }
}
export default new AuthController()