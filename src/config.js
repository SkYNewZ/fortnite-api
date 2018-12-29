import dotenv from 'dotenv-safe'
import { FortniteClient } from 'fortnite-client'

dotenv.config()

export default new FortniteClient({
  email: process.env.FORTNITE_ACCOUNT_EMAIL,
  password: process.env.FORTNITE_ACCOUNT_PASSWORD
})
