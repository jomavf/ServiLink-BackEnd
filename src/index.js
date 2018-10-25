import express from "express"
import db from "./database";
import config from "./config"
import router from "./router";

let _server;

const server = {
    start() {
        const app = express()

        config(app)
        db()

        const port = app.locals.config.PORT
        const host = app.locals.config.HOST

        router(app)

        _server = app.listen(port, () => {
            console.log(`Server listening on http://${host}:${port}`)
        })
        
        return _server

    },
    close() {
        _server.close()
    }
}

export default server

if (!module.parent) {
    server.start()
}

process.on('unhandledRejection', (err, p) => {
    console.log('Custom Error: An unhandledRejection ocurred')
    console.log(`Custom Error: Rejection: ${err}`)
})