import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { config } from './config'

const app = express()
const router = express.Router()
app.use('/api', router)
switch (config.APP_ENV) {
  case 'dev':
    app.use(morgan('dev'))
    break

  default:
    app.use(morgan('combined'))
    break
}
app.set('port', config.PORT || 3000)
app.use(express.static(path.join(__dirname, '../public')))

export { app, router }
