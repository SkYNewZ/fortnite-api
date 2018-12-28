import express from 'express'
import dotenv from 'dotenv'
import requireEnv from 'require-environment-variables'
import {
  FortniteClient,
  TimeWindow
} from 'fortnite-client'
import morgan from 'morgan'
import './utils'

// App configuration
let config = dotenv.config()
requireEnv([
  'FORTNITE_ACCOUNT_EMAIL',
  'FORTNITE_ACCOUNT_PASSWORD'
])
if (config.error) {
  throw config.error
}
config = config.parsed

const app = express()
const routes = express.Router()
app.use('/api', routes)
switch (config.APP_ENV) {
  case 'dev':
    app.use(morgan('dev'))
    break

  default:
    app.use(morgan('combined'))
    break
}
app.set('port', config.PORT || 3000)

const api = new FortniteClient({
  email: config.FORTNITE_ACCOUNT_EMAIL,
  password: config.FORTNITE_ACCOUNT_PASSWORD
})

routes.get('/status', (req, res) => {
  FortniteClient.CHECK_STATUS().then(status => {
    res.jsonp(status)
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

routes.get('/news', (req, res) => {
  FortniteClient.GET_GAME_NEWS(req.query.lang || 'en-US').then(news => {
    res.jsonp(news)
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

routes.get('/store', (req, res) => {
  api.getStore(req.query.lang || 'en-US').then(store => {
    res.jsonp(store)
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

routes.get('/stats/:username', (req, res) => {
  if (req.query.period && !Object.values(TimeWindow).includes(req.query.period)) {
    res.status(400).jsonp({
      'statusCode': 400,
      'message': 'Invalid `period` value',
      'availablesValues': Object.values(TimeWindow)
    })
  }
  api.lookup(req.params.username).then(player => {
    api.getBattleRoyaleStatsById(player.id, req.query.period || 'alltime').then(stats => {
      res.jsonp(stats)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

routes.get('/lookup/:username', (req, res) => {
  api.lookup(req.params.username).then(player => {
    res.jsonp(player)
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

routes.get('/lookup', (req, res) => {
  if (!req.query.ids) {
    res.status(400).jsonp({
      'statusCode': 400,
      'message': 'You must provide a comma-separated list of player\'s id. E.g: ?ids=111,222,333'
    })
  }

  const ids = req.query.ids.split(',')
  api.lookupByIds(ids).then(players => {
    res.jsonp(players)
  }).catch(error => {
    res.status(error.statusCode || 500).jsonp(error.error)
  })
})

app.get('/', (req, res) => {
  res.send('fortnite-api')
})

// default route
routes.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(app.get('port') || 3000, () => {
  api.login().then(() => {
    console.info('Successfully logged to EpicGames server')
  }).catch(error => {
    console.error(error)
  })
  console.log(`Listening on port ${app.get('port')}!`)
})
