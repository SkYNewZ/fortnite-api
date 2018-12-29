import SwaggerUiExpress from 'swagger-ui-express'
import path from 'path'

export default (express) => {
  const swaggerDocument = require(path.join(__dirname, '../../public/swagger.json'))
  express.use('/docs', SwaggerUiExpress.serve, (req, res) => {
    swaggerDocument.host = req.get('host')
    swaggerDocument.schemes = [req.protocol]
    SwaggerUiExpress.setup(swaggerDocument)(req, res)
  })
}
