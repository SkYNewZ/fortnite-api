export default (routes, api) => {
  routes.get('/lookup/:username', (req, res) => {
    api.lookup(req.params.username).then(player => {
      res.jsonp(player)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  })

  routes.get('/lookup', (req, res) => {
    if (!req.query.ids) {
      return res.status(400).jsonp({
        'statusCode': 400,
        'message': 'You must provide a comma-separated list of player\'s id. E.g: ?ids=111,222,333'
      })
    }

    const ids = req.query.ids.includes(',') ? req.query.ids.split(',') : req.query.ids
    api.lookupByIds(ids).then(players => {
      res.jsonp(players)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  })
}
