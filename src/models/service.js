import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    urlToImage: { type: String, required: false },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false }
})

mongoose.model('Service', ServiceSchema)

export default mongoose.model('Service')