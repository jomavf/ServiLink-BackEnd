import jwt from 'jsonwebtoken'
import { DataResponse } from './models/data-response'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);
    
    const dataResponse = new DataResponse()
    if (!authHeader) {
        dataResponse.message = 'No token provided'
        return res.status(403).json(dataResponse)
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.SECRET, { ignoreExpiration: true }, (err, decoded) => {
        if (err) {
            console.log(err)
            dataResponse.message = 'Failed to authenticate token.'
            return res.status(500).json(dataResponse)
        }
        req.user = decoded
        console.log(decoded)
        next()
    })
}