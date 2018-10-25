import service from './routes/services'
import auth from './routes/auth'
import home from './routes/home'

export default app => {
    app.use('/auth', auth)
    app.use('/service', service)
    app.use('/',home)
}
