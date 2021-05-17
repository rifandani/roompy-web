/// <reference types="cypress" />

describe('qrcode API test: /api/qrcode', () => {
  // GET /api/qrcode
  context('with GET request', () => {
    it('should SUCCESS creating qrcode', () => {
      cy.request('GET', '/api/qrcode').should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
        expect(response.body.url).to.be.a('string')
      })
    })
  })

  // POST /api/qrcode
  context('with POST request', () => {
    // ERROR - empty request.body.url
    it('should ERROR creating qrcode - empty request.body.url', () => {
      const requestBody = {
        url: '',
      }

      cy.postQrcode(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property(
          'message',
          'url is a required field'
        )
        expect(response.body).to.have.property('errors')
      })
    })

    // ERROR - invalid request.body.url
    it('should ERROR creating qrcode - invalid request.body.url', () => {
      const requestBody = {
        url: 'this is not a valid URL',
      }

      cy.postQrcode(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property(
          'message',
          'url must be a valid URL'
        )
        expect(response.body).to.have.property('errors')
      })
    })

    // SUCCESS - valid request.body.url
    it('should SUCCESS creating qrcode - valid request.body.url', () => {
      const requestBody = {
        url: 'https://roompy.vercel.app/roompies/OAqeo4bCzGkbmsg9UTGm',
      }

      cy.postQrcode(requestBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
        expect(response.body.url).to.be.a('string')
      })
    })
  })
})
