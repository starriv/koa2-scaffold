import http from 'http'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import logdir from  'mini-logger'
import Koa from 'koa'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import config from './config'

const app = new Koa()
const bodyparser = Bodyparser()

//log 记录
const log = logdir({
    dir: config.get('LOGDIR'),
    categories: ['http'],
    format: '[{category}.]YYYY-MM-DD[.log]'
})

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
    pathPrefix: ''
})))

// views
app.use(views(path.join(__dirname, '../views'), {
    map: {
        html: 'nunjucks'
    }
}))


// 500 error
koaOnError(app, {
    template: 'views/public/500.html'
})

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    // log.http('http request url: %s', `${ctx.method} ${ctx.url} - ${ms}ms`)
    log.http(`${JSON.stringify(ctx.request)}`)
})

// router
app.use(async(ctx, next) => {
    await require('./routes').routes()(ctx, next)
})

// 404 error
app.use(async(ctx) => {
    ctx.status = 404
    await ctx.render('public/404')
})

// error logger
app.on('error', async(err, ctx) => {
    log.error(new Error(err))
    console.log('error occured:', err)
})

const port = parseInt(config.get('PORT'))
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    switch (error.code) {
        case 'EACCES':
            console.error(port + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(port + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
})

server.on('listening', () => {
    console.log('Listening on port: %d', port)
})

export default app
