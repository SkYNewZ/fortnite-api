export default (routes, api) => {
  routes.get('/store', (req, res) => {
    api.getStore(req.query.lang || 'en-US').then(store => {
      res.jsonp(store)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  })
}
