import axios from 'axios'
import { it, describe, before } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'

const statusResponse = require('./responses/status.json')

describe('/status', () => {
  before(() => {
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/status')
      .times(2)
      .reply(200, statusResponse)
  })

  it('sould return 200', (done) => {
    axios.get('http://127.0.0.1:3000/api/status')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be status object', (done) => {
    axios.get('http://127.0.0.1:3000/api/status')
      .then(response => {
        expect(response.data).to.deep.equal(statusResponse)
        done()
      })
  })
})
