import axios from 'axios'
import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import { server } from '../lib/server'

let running

describe('/docs', () => {
  before(done => {
    running = server.listen(3000, done())
  })

  after(done => {
    running.close(done())
  })
  it('sould return 200', done => {
    axios.get('http://127.0.0.1:3000/docs')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })
})
