export class DataResponse {
    constructor(success = false, message = 'Request pending processing') {
        this.success = success
        this.code = '500'
        this.message = message
        this.item = {}
        this.items = []
        this.total = 0
    }
}