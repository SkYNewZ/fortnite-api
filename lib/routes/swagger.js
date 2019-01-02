import SwaggerUiExpress from 'swagger-ui-express'
import path from 'path'
import fs from 'fs'

export default (routeur) => {
  const swaggerDocument = require(path.join(__dirname, '../../public/swagger.json'))
  const options = {
    explorer: false,
    customCss: fs.readFileSync(path.join(__dirname, '../../node_modules/swagger-ui-themes/themes/3.x/theme-feeling-blue.css'))
  }
  routeur.use('/docs', SwaggerUiExpress.serve, (req, res) => {
    swaggerDocument.host = req.get('host')
    swaggerDocument.schemes = [req.protocol]
    SwaggerUiExpress.setup(swaggerDocument, options)(req, res)
  })
}
