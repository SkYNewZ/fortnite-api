export default (app) => {
  // default route
  app.get('*', (req, res) => {
    res.status(404).jsonp({
      'statusCode': 404,
      'message': 'Page not found'
    })
  })
}
