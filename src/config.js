import dotenv from 'dotenv'
import requireEnv from 'require-environment-variables'
import { FortniteClient } from 'fortnite-client'

let config = dotenv.config()
requireEnv([
  'FORTNITE_ACCOUNT_EMAIL',
  'FORTNITE_ACCOUNT_PASSWORD'
])
if (config.error) {
  throw config.error
}
config = config.parsed

const api = new FortniteClient({
  email: config.FORTNITE_ACCOUNT_EMAIL,
  password: config.FORTNITE_ACCOUNT_PASSWORD
})

export { config, api }
