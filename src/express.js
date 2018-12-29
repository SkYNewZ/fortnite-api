import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { config } from './config'

const app = express()
const router = express.Router()
app.use('/api', router)
switch (process.env.NODE_ENV) {
  case 'production':
    app.use(morgan('combined'))
    break

  default:
    app.use(morgan('dev'))
    break
}
app.set('port', config.PORT || process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '../public')))

export { app, router }
