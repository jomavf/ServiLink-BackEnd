import jwt from 'jsonwebtoken'
import { DataResponse } from './models/data-response'

export const verifyToken = (req, res, next) => {
    const token = req.headers["access-token"]
    const dataResponse = new DataResponse()
    if (!token) {
        dataResponse.message = 'No token provided'
        return res.status(403).json(dataResponse)
    }
    jwt.verify(token, process.env.SECRET, { ignoreExpiration: true }, (err, decoded) => {
        if (err) {
            dataResponse.message = 'Failed to authenticate token.'
            return res.status(500).json(dataResponse)
        }
        req.userId = decoded.id
        next()
    })
}