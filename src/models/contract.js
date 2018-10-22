import mongoose from 'mongoose'

const NotificationShema = new mongoose.Schema({
    title: String,
    description: String,
    state: Boolean, // if is active or not (the notification)
    hidden: {
        type: Boolean,
        default: false
    }
})

mongoose.model('Notification', NotificationShema)

export default mongoose.model('Notification')