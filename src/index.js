import express from "express"
import db from "./database";
import config from "./config"
import router from "./router";

let _server;

const server = {
    start() {
        const app = express()

        db()
        config(app)
        router(app)

        var port = process.env.PORT
        var host = process.env.HOST

        _server = app.listen(port || 5000, () => {
            console.log(`Listening on http://${host}:${port}`)
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