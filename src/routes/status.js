import { FortniteClient } from 'fortnite-client'

export default (routes) => {
  routes.get('/status', (req, res) => {
    FortniteClient.CHECK_STATUS().then(status => {
      res.jsonp(status)
    }).catch(error => {
      res.status(error.statusCode || 500).jsonp(error.error)
    })
  })
}
