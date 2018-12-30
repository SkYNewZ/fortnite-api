import api from './config'
import { app, router } from './express'
import './utils'
import figlet from 'figlet'
import '@babel/polyfill'

// routing
import status from './routes/status'
import news from './routes/news'
import defaultRoutes from './routes/default'
import leaderboard from './routes/leaderboard'
import lookup from './routes/lookup'
import stats from './routes/stats'
import store from './routes/store'
import swagger from './routes/swagger'

// routing
status(router)
news(router)
lookup(router, api)
stats(router, api)
store(router, api)
leaderboard(router, api)
swagger(app)
defaultRoutes(app)

async function bootstrap () {
  let { name } = require('../package.json')
  switch (process.env.NODE_ENV) {
    case 'test':
      name += '\n Testing mode'
      break

    case 'production':
      break

    default:
      name += '\n Dev mode'
      break
  }

  console.log(figlet.textSync(name).rainbow)
  if (process.env.NODE_ENV !== 'test') {
    await api.login().then(() => console.info('Successfully logged to EpicGames server'))
  } else {
    console.info('Bypass EpicGames authentification')
  }

  const port = app.get('port') || 3000
  const hostname = '0.0.0.0'
  app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`)
  })
}

// start main server
if (process.env.NODE_ENV !== 'test') {
  bootstrap()
}

export { app as server }
