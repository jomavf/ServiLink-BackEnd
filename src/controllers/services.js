class ServicesController {
    services(req, res, next) {
        return res.status(201).json({
            message: 'list of services'
        })
    }
    serviceById(req, res, next) {
        return res.status(201).json({
            message: 'service by id'
        })
    }
    editServiceById(req, res, next) {
        return res.status(201).json({
            message: 'edit service by id'
        })
    }
}
export default new ServicesController()