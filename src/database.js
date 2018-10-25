import { config } from 'dotenv'
import mongoose from 'mongoose'

const SETTINGS = config()

export default () => {
    mongoose.connect(
        // `${SETTINGS.parsed.DB_PROTOCOL}://${SETTINGS.parsed.DB_URL}:${SETTINGS.parsed.DB_PORT}/${SETTINGS.parsed.DB_NAME}`,
        "mongodb+srv://zetagh:zetaghpwd@cluster0-zjrjx.mongodb.net/servilink?retryWrites=true",
        { useNewUrlParser: true }
    ).then(() => { console.log('Successful connection to MongoDB') })
        .catch(err => console.log(`The error is: ${err}`))
}