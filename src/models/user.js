import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    age: { type: Number, required: false },
    mail: { type: String, required: false },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false , default: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.nzasianleaders.com%2Fwp-content%2Fuploads%2Fdefault-avatar.jpg&f=1" },
    role: { type: String, default: 'user' },
    hidden: { type: Boolean, default: false }

}, { strict: false })

mongoose.model('User', UserSchema)

export default mongoose.model('User')

