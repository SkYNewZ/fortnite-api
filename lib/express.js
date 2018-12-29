import express from 'express'
import morgan from 'morgan'
import path from 'path'
import './utils'

const app = express()
const router = express.Router()
app.use('/api', router)
switch (process.env.NODE_ENV) {
  case 'production':
    app.use(morgan('combined'))
    break

  case 'test':
    console.info('You are running app in testing mode')
    app.use(morgan('tiny'))
    break

  default:
    app.use(morgan('dev'))
    break
}
app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '../public')))

export { app, router }
