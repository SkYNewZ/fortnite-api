import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'
import { server } from '../lib/server'

const lookupResponse = require('./responses/lookup.json')
let running

describe('/lookup', () => {
  before(done => {
    // https://www.npmjs.com/package/nock#allow-unmocked-requests-on-a-mocked-hostname
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/lookup/skynewz')
      .times(2)
      .reply(200, lookupResponse)
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('sould return 200', done => {
    axios.get('http://127.0.0.1:3000/api/lookup/skynewz')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be lookup object', done => {
    axios.get('http://127.0.0.1:3000/api/lookup/skynewz')
      .then(response => {
        expect(response.data).to.deep.equal(lookupResponse)
        done()
      })
  })

  it('sould return 400', done => {
    axios.get('http://127.0.0.1:3000/api/lookup')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        done()
      })
  })
})
