import service from './routes/services'
import auth from './routes/auth'

export default app => {
    app.use('/auth', auth)
    app.use('/service', service)

    app.use((req,res,next)=>{
        const error = new Error('Not found')
        error.status = 404
        next(error) // Aqui no le estoy pasando el error a express porque no es asincrono , el next(error) se pasa cuando la funcion es asincrona
    })
    
    app.use((error,req,res,next)=>{
        res.status(error.status || 500).json({
            error:{
                message: error.message
            }
        })
    })
}
