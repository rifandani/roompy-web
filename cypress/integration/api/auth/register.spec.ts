/// <reference types="cypress" />

import { datatype } from 'faker'

describe('auth API test: /api/auth', () => {
  const validId = datatype.uuid()

  /* -------------------------------------------------------------------------- */
  /*                          SECTION - POST /register                          */
  /* -------------------------------------------------------------------------- */
  context('with POST request', () => {
    /* ----------------- ANCHOR - ERROR - empty request.body ----------------- */
    it('should ERROR creating user - empty request.body', () => {
      const requestBody = {
        id: '',
        username: '',
        email: '',
      }

      cy.registerUser(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property('errors')
      })
    })

    /* ------------- ANCHOR - ERROR - invalid request.body.email ------------- */
    it('should ERROR creating user - invalid request.body.email', () => {
      const requestBody = {
        id: 'username12345',
        username: 'username',
        email: 'username',
      }

      cy.registerUser(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property('message', 'Invalid email')
        expect(response.body).to.have.property('errors')
      })
    })

    /* ----------- ANCHOR - ERROR - already exists request.body.id ----------- */
    it('should ERROR creating user - already exists request.body.id', () => {
      const requestBody = {
        id: 'gjLF9J9LcJXcqtoNl5NxVNTi4Sl2',
        username: 'username',
        email: 'username@email.com',
      }

      cy.registerUser(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property(
          'message',
          'Id is already exists'
        )
      })
    })

    /* ------------------ ANCHOR - SUCCESS - valid request.body ----------------- */
    it('should SUCCESS creating user - valid request.body', () => {
      const requestBody = {
        id: validId,
        username: 'username',
        email: 'username@email.com',
      }

      cy.registerUser(requestBody).should((response) => {
        cy.log('response body', response.body)
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
      })

      cy.deleteUser(validId).then((res) => {
        cy.log('delete user', res.body)
      })
    })
  })
})
