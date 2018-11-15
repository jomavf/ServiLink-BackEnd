import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    title: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    position: { lat: { type:Number , required: false} , lng: { type:Number , required: false} },
    urlToImage: { type: String, required: false , default:"https://c-lj.gnst.jp/public/img/common/noimage.jpg?20180831050039" },
    date: { type: Date, default: Date.now() },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    username:{type:String,default:"Unnamed"},
    hidden: { type: Boolean, default: false }
})

mongoose.model('Service', ServiceSchema)

export default mongoose.model('Service')