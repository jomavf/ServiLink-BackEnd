import { config } from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

const SETTINGS = config()

export default app => {
    app.disable('x-powered-by')

    
    app.set('port', process.env.PORT || 5000)
    app.set('config', SETTINGS.parsed)
    app.locals.env = app.get('env')
    app.locals.config = app.get('config')
    
    if (process.env.ENV === 'dev') {
        app.use(morgan("dev"))
    }
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}