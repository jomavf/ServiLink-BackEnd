import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    name: { type: String, required: true, unique:true,default:"no-category" },
    description: { type: String, required: false },
    urlToImage: { type: String, required: false }
})
mongoose.model('Category', CategorySchema)

export default mongoose.model('Category')