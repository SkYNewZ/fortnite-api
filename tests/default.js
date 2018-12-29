import axios from 'axios'
import { it, describe } from 'mocha'
import { expect } from 'chai'
import path from 'path'

describe('/ping', () => {
  it('should return 200', () => {
    axios.get('http://127.0.0.1:3000/ping')
      .then(response => {
        expect(response.status).to.be.equal(200)
      })
  })

  const {
    name,
    version,
    description
  } = require(path.join(__dirname, '../package.json'))

  it('should be a correct \'ping\' response', () => {
    axios.get('http://127.0.0.1:3000/ping')
      .then(response => {
        expect(typeof response).to.equal('object')
        expect(response.data.name).to.be.equal(name)
        expect(response.data.description).to.be.equal(description)
        expect(response.data.version).to.be.equal(version)
      })
  })
})

describe('404', () => {
  it('sould return 404', () => {
    axios.get('http://127.0.0.1:3000/api/404')
    // catch block because 404 response
      .catch(error => {
        expect(error.response.status).to.be.equal(404)
      })
  })

  it('sould return 404', () => {
    axios.get('http://127.0.0.1:3000/404')
    // catch block because 404 response
      .catch(error => {
        expect(error.response.status).to.be.equal(404)
      })
  })
})
