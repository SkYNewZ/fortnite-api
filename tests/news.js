import axios from 'axios'
import { it, describe, before } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'
import tabulateLogging from './utils'

const newsResponse = require('./responses/news.json')

describe('/news', () => {
  before(() => {
    nock('http://127.0.0.1:3000', { allowUnmocked: true })
      .log(tabulateLogging)
      .get('/api/news')
      .times(2)
      .reply(200, newsResponse)
  })

  it('sould return 200', (done) => {
    axios.get('http://127.0.0.1:3000/api/news')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })

  it('sould be news object', (done) => {
    axios.get('http://127.0.0.1:3000/api/news')
      .then(response => {
        expect(response.data).to.deep.equal(newsResponse)
        done()
      })
  })
})
