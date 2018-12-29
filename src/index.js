import { api } from './config'
import { app, router } from './express'
import 'colors'
import './utils'

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

// start main server
app.listen(app.get('port') || 3000, () => {
  api.login().then(() => {
    console.info('Successfully logged to EpicGames server')
  }).catch(error => {
    console.error(error)
  })
  console.log(`Listening on port ${app.get('port')}!`)
})
