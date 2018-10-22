import mongoose from 'mongoose'
import { config } from 'dotenv'

const SETTINGS = config()

export default () => {
    mongoose.connect(
        `${SETTINGS.parsed.DB_PROTOCOL}://${SETTINGS.parsed.DB_URL}:${SETTINGS.parsed.DB_PORT}/${SETTINGS.parsed.DB_NAME}`,
        { useNewUrlParser: true }
    ).then(() => { console.log('Successful connection to MongoDB') })
        .catch(err => console.log(`The error is: ${err}`))
}