import path from 'path'

export default (app) => {
  app.get('/ping', (req, res) => {
    const {
      name,
      version,
      description
    } = require(path.join(__dirname, '../../package.json'))
    res.jsonp({
      name,
      description,
      version,
      uptime: process.uptime()
    })
  })

  // default route
  app.get('*', (req, res) => {
    res.status(404).jsonp({
      'statusCode': 404,
      'message': 'Page not found'
    })
  })
}
