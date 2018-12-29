import axios from 'axios'
import { it, describe, before } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import { TimeWindow } from 'fortnite-client'
import tabulateLogging from './utils'

const statsResponse = require('./responses/stats.json')

describe('/stats', () => {
  before(() => {
    // https://www.npmjs.com/package/nock#allow-unmocked-requests-on-a-mocked-hostname
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/stats/skynewz')
      .times(2)
      .reply(200, statsResponse)
  })

  it('sould return 200', (done) => {
    axios.get('http://127.0.0.1:3000/api/stats/skynewz')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be stats object', (done) => {
    axios.get('http://127.0.0.1:3000/api/stats/skynewz')
      .then(response => {
        expect(response.data).to.deep.equal(statsResponse)
        done()
      })
  })

  it('sould return 400', (done) => {
    axios.get('http://127.0.0.1:3000/api/stats/skynewz?period=badperiod')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        expect(error.response.data.statusCode).to.be.equal(400)
        expect(error.response.data.message).to.be.equal('Invalid `period` value')
        expect(typeof error.response.data.availablesValues).to.equal('object')
        expect(error.response.data.availablesValues).to.deep.equal(Object.values(TimeWindow))
        done()
      })
  })
})
