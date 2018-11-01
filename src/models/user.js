import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    age: { type: Number, required: false },
    mail: { type: String, required: false },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    specialist: { type: Boolean, default: false }, //TODO:should be ROLE attribute
    hidden: { type: Boolean, default: false }

}, { strict: false })

mongoose.model('User', UserSchema)

export default mongoose.model('User')

