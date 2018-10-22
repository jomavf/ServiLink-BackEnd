import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    age: { type: Number, required: false },
    mail: { type: String, required: false },
    username: { type: String, unique: true, strict: true },
    password: { type: String, strict: true },
    avatar: { type: String, required: false },
    specialist: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false }

}, { strict: false })

mongoose.model('User', UserSchema)

export default mongoose.model('User')

