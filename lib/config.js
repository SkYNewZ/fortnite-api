import dotenv from 'dotenv-safe'
import { FortniteClient } from 'fortnite-client'
import * as Sentry from '@sentry/node'
import path from 'path'

const { name, version } = require(path.join(__dirname, '../package.json'))
Sentry.init({
  dsn: 'https://5ce18b9d7df241f4809521da2f5e7a6b@sentry.io/1361959',
  release: `${name}@${version}`,
  environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
})

dotenv.config()

export default new FortniteClient({
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD
})
