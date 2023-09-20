import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import passport from 'koa-passport'
import helmet from 'koa-helmet'
import { Middleware } from 'koa-compose'
import http2 from 'http2'
import fs from 'fs'
import errorMiddleware from '../app/core/middleware/ErrorMiddleware'
import config from '../resources/config'
import routes from '../app/routes'
require("dotenv").config();


const app: Koa = new Koa()

// Loading certificates
const options: http2.SecureServerOptions = {
    cert: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.crt`),
    key: fs.readFileSync(`${process.cwd()}/src/resources/cert/localhost.key`),
    allowHTTP1: true
}

const _use: Function = app.use
app.use = (x: Middleware<any>) => _use.call(app, convert(x))

app.use(helmet())
app.use(logger())
app.use(bodyParser())
app.use(errorMiddleware.errorMiddleware())
app.use(passport.initialize())
app.use(passport.session())

routes(app)
http2
    .createSecureServer(options, app.callback())
    .listen(config.port, () => {
        console.log(`Server started on ${config.port}`)
    })


