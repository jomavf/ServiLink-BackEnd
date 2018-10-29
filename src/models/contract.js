import mongoose from 'mongoose'

const ContractShema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    title: { type: String, required: true },
    description: { type: String, required: true },
    hidden: { type: Boolean, default: false }
})

mongoose.model('Contract', ContractShema)

export default mongoose.model('Contract')