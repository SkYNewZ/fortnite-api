import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import { LeaderboardType, Platform, GroupTypeConverted, TimeWindow } from 'fortnite-client'
import tabulateLogging from './utils'
import { server } from '../lib/server'

const leaderboardResponse = require('./responses/leaderboard.json')
let running

describe('/leaderboard', () => {
  before(done => {
    // https://www.npmjs.com/package/nock#allow-unmocked-requests-on-a-mocked-hostname
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/leaderboard/placetop25/pc/squad')
      .times(2)
      .reply(200, leaderboardResponse)
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('sould return 200', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/placetop25/pc/squad')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be leaderboard object', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/placetop25/pc/squad')
      .then(response => {
        expect(response.data).to.deep.equal(leaderboardResponse)
        done()
      })
  })

  it('sould return 400 because wrong period', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/placetop25/pc/squad?period=badperiod')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        expect(error.response.data.statusCode).to.be.equal(400)
        expect(error.response.data.message).to.be.equal('Invalid `period` value')
        expect(typeof error.response.data.availablesValues).to.equal('object')
        expect(error.response.data.availablesValues).to.deep.equal(Object.values(TimeWindow))
        done()
      })
  })

  it('sould return 400 because wrong type', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/badtype/pc/squad')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        expect(error.response.data.statusCode).to.be.equal(400)
        expect(error.response.data.message).to.be.equal('Invalid `leaderboard type` value')
        expect(typeof error.response.data.availablesValues).to.equal('object')
        expect(error.response.data.availablesValues).to.deep.equal(Object.values(LeaderboardType))
        done()
      })
  })

  it('sould return 400 because wrong platform', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/placetop25/badplatform/squad')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        expect(error.response.data.statusCode).to.be.equal(400)
        expect(error.response.data.message).to.be.equal('Invalid `platform` value')
        expect(typeof error.response.data.availablesValues).to.equal('object')
        expect(error.response.data.availablesValues).to.deep.equal(Object.values(Platform))
        done()
      })
  })

  it('sould return 400 because group platform', done => {
    axios.get('http://127.0.0.1:3000/api/leaderboard/placetop25/pc/badgroup')
      .catch(error => {
        expect(error.response.status).to.be.equal(400)
        expect(error.response.data.statusCode).to.be.equal(400)
        expect(error.response.data.message).to.be.equal('Invalid `group type` value')
        expect(typeof error.response.data.availablesValues).to.equal('object')
        expect(error.response.data.availablesValues).to.deep.equal(Object.values(GroupTypeConverted))
        done()
      })
  })
})
