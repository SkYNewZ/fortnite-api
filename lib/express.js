import express from 'express'
import morgan from 'morgan'
import path from 'path'
import './utils'

const app = express()
const morganMode = (format) => morgan(format, { immediate: false })
switch (process.env.NODE_ENV) {
  /* istanbul ignore next */ // never hit, we test with NODE_ENV=test
  case 'production':
    app.use(morganMode('=> [:date] - ":method :url :status" :remote-addr ":user-agent"'))
    break

  case 'test':
    break

  /* istanbul ignore next */ // this case is used for `dev` mode
  default:
    app.use(morganMode(':method :url :status'))
    break
}
app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '../public')))
const router = express.Router()
app.use('/api', router)

export { app, router }
