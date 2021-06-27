/// <reference types="cypress" />

describe('GET and POST /api/qrcode', () => {
  // GET /api/qrcode
  context('with GET request', () => {
    it('should SUCCESS creating qrcode', () => {
      cy.request('GET', '/api/qrcode').should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('error', false)
        expect(response.body.url).to.be.a('string')
      })
    })
  })

  // POST /api/qrcode
  context('with POST request', () => {
    /* ------------------------------- ERROR - empty request.body.url ------------------------------- */
    it('should ERROR creating qrcode - empty request.body.url', () => {
      const emptyBody = {
        url: '',
      }

      cy.postQrcode(emptyBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.name).to.eq('ValidationError')
        expect(response.body.message).to.be.a('string')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })
    })

    /* ------------------------------ ERROR - invalid request.body.url ------------------------------ */
    it('should ERROR creating qrcode - invalid request.body.url', () => {
      const invalidBody = {
        url: 'this is not a valid URL',
      }

      cy.postQrcode(invalidBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.name).to.eq('ValidationError')
        expect(response.body.message).to.be.a('string')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })
    })

    /* ------------------------------ SUCCESS - valid request.body.url ------------------------------ */
    it('should SUCCESS creating qrcode - valid request.body.url', () => {
      const requestBody = {
        url: 'https://roompy.vercel.app/roompies/OAqeo4bCzGkbmsg9UTGm',
      }

      cy.postQrcode(requestBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.error).to.eq(false)
        expect(response.body.url).to.be.a('string')
      })
    })
  })
})
