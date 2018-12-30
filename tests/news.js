import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'
import { server } from '../lib/server'

const newsResponse = require('./responses/news.json')
let running

describe('/news', () => {
  before(done => {
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/news')
      .times(2)
      .reply(200, newsResponse)
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })

  it('sould return 200', done => {
    axios.get('http://127.0.0.1:3000/api/news')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be news object', done => {
    axios.get('http://127.0.0.1:3000/api/news')
      .then(response => {
        expect(response.data).to.deep.equal(newsResponse)
        done()
      })
  })
})
