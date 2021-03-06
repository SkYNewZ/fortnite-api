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
import ping from './routes/ping'

// routing
status(router)
news(router)
lookup(router, api)
stats(router, api)
store(router, api)
leaderboard(router, api)
swagger(router)
ping(router)
defaultRoutes(app)

/* istanbul ignore next */ // this case is used for `dev` mode
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
    await api.login()
      .then(() => console.info('Successfully logged to EpicGames server'))
      .catch((err) => {
        console.error('Error during logged to EpicGames server')
        console.error(err)
        process.exit(1)
      })
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
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  bootstrap()
}

export { app as server }
