import { TimeWindow } from 'fortnite-client'

export default (routes, api) => {
  routes.get('/stats/:username', (req, res) => {
    if (req.query.period && !Object.values(TimeWindow).includes(req.query.period)) {
      return res.status(400).jsonp({
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
}
