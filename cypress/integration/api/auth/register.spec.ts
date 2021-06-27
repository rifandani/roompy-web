/// <reference types="cypress" />

describe('POST /api/auth/register', () => {
  const validId = '8zXuZV5f8CQ3SCVy5VvaZDR2fp69' // di mirip2 in

  before(() => {
    cy.clearCookies()
  })

  after(() => {
    // DELETE user after all tests
    cy.deleteUser(validId)
    cy.clearCookies()
  })

  context('register', () => {
    /* ----------------- ERROR - empty request.body ----------------- */
    it('should ERROR - empty request.body', () => {
      const emptyBody = {
        id: '',
        username: '',
        email: '',
      }

      // register by API
      cy.registerByApi(emptyBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.name).to.eq('ValidationError')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)
    })

    /* ------------- ERROR - invalid request.body.email ------------- */
    it('should ERROR - invalid request.body.email', () => {
      const invalidEmailBody = {
        id: 'username12345QWERTY',
        username: 'username',
        email: 'username',
      }

      // register by API
      cy.registerByApi(invalidEmailBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.name).to.eq('ValidationError')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)
    })

    /* ----------- ERROR - user.id already exists ----------- */
    it('should ERROR - user.id already exists', () => {
      const alreadyExistedId = {
        id: '8zXuZV5f8CQ3SCVy5VvaZDR2fp73', // elonmusk@gmail.com
        username: 'username',
        email: 'username@email.com',
      }

      // register by API
      cy.registerByApi(alreadyExistedId).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.message).to.be.a('string')
      })

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)
    })

    /* ------------------ SUCCESS - valid request.body ----------------- */
    it('should SUCCESS - valid request.body', () => {
      const requestBody = {
        id: validId,
        username: 'cypress',
        email: 'cypress@gmail.com',
      }

      // register by API
      cy.registerByApi(requestBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.error).to.eq(false)
        expect(response.body.message).to.be.a('string')
      })

      // auth cookie should be present
      cy.getCookies().should('have.length.at.least', 1)
    })
  })
})
