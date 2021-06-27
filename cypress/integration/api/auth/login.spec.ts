/// <reference path="../../../support/index.d.ts" />

describe('POST /api/auth/login', () => {
  before(() => {
    cy.clearCookies()
  })

  after(() => {
    cy.clearCookies()
  })

  context('login', () => {
    /* --------------------------------- ERROR - empty req.body --------------------------------- */
    it('should ERROR - empty req.body', () => {
      const emptyBody = {
        id: '',
      }

      // login by API
      cy.loginByApi(emptyBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.message).to.be.a('string')
        expect(response.body.name).to.eq('ValidationError')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)
    })

    /* --------------------------------- ERROR - user does not exists --------------------------------- */
    it('should ERROR - user does not exists', () => {
      const invalidBody = {
        id: 'whatever12456QWERTY',
      }

      // login by API
      cy.loginByApi(invalidBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq(true)
        expect(response.body.message).to.be.a('string')
      })

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)
    })

    /* -------------------------------- SUCCESS - valid req.body -------------------------------- */
    it('should SUCCESS - valid req.body', () => {
      const validBody = {
        id: '8zXuZV5f8CQ3SCVy5VvaZDR2fp73', // elonmusk@gmail.com
      }

      // login by API
      cy.loginByApi(validBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.error).to.eq(false)
        expect(response.body.message).to.be.a('string')
      })

      // auth cookie should be present
      cy.getCookies().should('have.length.at.least', 1)
    })
  })
})
