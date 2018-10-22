import service from './routes/services'
import auth from './routes/auth'

export default app => {
    app.use('/auth', auth)
    app.use('/service', service)
}
