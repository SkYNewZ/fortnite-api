import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'
import { server } from '../lib/server'

const storeResponse = require('./responses/store.json')
let running

describe('/store', () => {
  before(done => {
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/store')
      .times(2)
      .reply(200, storeResponse)
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('sould return 200', done => {
    axios.get('http://127.0.0.1:3000/api/store')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be store object', done => {
    axios.get('http://127.0.0.1:3000/api/store')
      .then(response => {
        expect(response.data).to.deep.equal(storeResponse)
        done()
      })
  })
})
