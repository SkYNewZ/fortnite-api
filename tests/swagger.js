import axios from 'axios'
import { it, describe } from 'mocha'
import { expect } from 'chai'

describe('/docs', () => {
  it('sould return 200', (done) => {
    axios.get('http://127.0.0.1:3000/docs')
      .then(response => {
        expect(response.status).to.be.equal(200)
        done()
      })
  })
})
