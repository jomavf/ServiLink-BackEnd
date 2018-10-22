import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    urlToImage: String,
    hidden: {
        type: Boolean,
        default: false
    }
})

mongoose.model('Service', ServiceSchema)

export default mongoose.model('Service')