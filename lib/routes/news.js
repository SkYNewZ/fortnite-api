/* istanbul ignore file */
// used because some routes are mocked to prevent error from EpicGames

import { FortniteClient } from 'fortnite-client'

export default (routes) => {
  routes.get('/news', (req, res) => {
    FortniteClient.GET_GAME_NEWS(req.query.lang || 'en-US').then(news => {
      res.jsonp(news)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  })
}
