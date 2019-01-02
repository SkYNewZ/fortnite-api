import path from 'path'

export default (routeur) => {
  routeur.get('/ping', (req, res) => {
    const {
      name,
      version,
      description
    } = require(path.join(__dirname, '../../package.json'))
    const date = new Date(null)
    date.setSeconds(process.uptime())
    const timeString = date.toISOString().substr(11, 8)
    res.jsonp({
      name,
      description,
      version,
      uptime: timeString
    })
  })
}
