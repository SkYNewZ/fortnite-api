import axios from 'axios'
import { it, describe, before } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'

const storeResponse = require('./responses/store.json')

describe('/store', () => {
  before(() => {
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/store')
      .times(2)
      .reply(200, storeResponse)
  })

  it('sould return 200', (done) => {
    axios.get('http://127.0.0.1:3000/api/store')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be store object', (done) => {
    axios.get('http://127.0.0.1:3000/api/store')
      .then(response => {
        expect(response.data).to.deep.equal(storeResponse)
        done()
      })
  })
})
