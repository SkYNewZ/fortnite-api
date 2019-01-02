import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import path from 'path'
import { server } from '../lib/server'

let running

describe('/ping', () => {
  before(done => {
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('should return 200', done => {
    axios.get('http://127.0.0.1:3000/api/ping')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  const {
    name,
    version,
    description
  } = require(path.join(__dirname, '../package.json'))

  it('should be a correct \'ping\' response', done => {
    axios.get('http://127.0.0.1:3000/api/ping')
      .then(response => {
        expect(typeof response).to.equal('object')
        expect(response.data.name).to.be.equal(name)
        expect(response.data.description).to.be.equal(description)
        expect(response.data.version).to.be.equal(version)
        done()
      })
  })
})

describe('404', () => {
  before(done => {
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('sould return 404', done => {
    axios.get('http://127.0.0.1:3000/api/404')
    // catch block because 404 response
      .catch(error => {
        expect(error.response.status).to.be.equal(404)
        done()
      })
  })

  it('sould return 404', done => {
    axios.get('http://127.0.0.1:3000/404')
    // catch block because 404 response
      .catch(error => {
        expect(error.response.status).to.be.equal(404)
        done()
      })
  })
})
