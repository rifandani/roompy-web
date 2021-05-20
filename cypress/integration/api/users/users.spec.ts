/// <reference types="cypress" />

describe('users API test: /api/users', () => {
  const invalidUserId = 'as097801243hnasfasfhjxxx'
  const validUserId = 'gjLF9J9LcJXcqtoNl5NxVNTi4Sl2'

  // GET /api/users
  context('with GET request', () => {
    // SUCCESS
    it('should SUCCESS getting all users', () => {
      cy.getUsers().should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body[0].username).to.be.a('string')
        expect(response.body[0].createdAt).to.be.a('number')
        expect(response.body[0].premium).to.be.a('boolean')
      })
    })

    // ERROR - invalid req.query.id (userId)
    it('should ERROR getting 1 user - invalid req.query.id (userId)', () => {
      cy.getUser(invalidUserId).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body.message).to.be.a('string')
      })
    })

    // SUCCESS - valid req.query.id (userId)
    it('should SUCCESS getting 1 user - valid req.query.id (userId)', () => {
      cy.getUser(validUserId).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.be.a('string')
        expect(response.body.createdAt).to.be.a('number')
        expect(response.body.premium).to.be.a('boolean')
      })
    })
  })

  // PUT /api/users
  context('with PUT request', () => {
    // ERROR - invalid request.query.id
    it('should ERROR updating user - invalid request.query.id', () => {
      const requestBody = {
        username: 'rifandani',
        email: 'rifandani@gmail.com',
      }

      cy.putUser(invalidUserId, requestBody).should((response) => {
        expect(response.status).to.eq(500)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'FirebaseError')
      })
    })

    // ERROR - empty request.body
    it('should ERROR updating user - empty request.body', () => {
      const requestBody = {
        username: '',
        email: '',
      }

      cy.putUser(validUserId, requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property('errors')
      })
    })

    // ERROR - invalid request.body.email
    it('should ERROR updating user - invalid request.body.email', () => {
      const requestBody = {
        username: 'Rifandani',
        email: 'asdsadasdasd',
      }

      cy.putUser(validUserId, requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property(
          'message',
          'email must be a valid email'
        )
        expect(response.body).to.have.property('errors')
      })
    })

    // SUCCESS - valid request.body
    it('should SUCCESS updating user - valid request.body', () => {
      const requestBody = {
        username: 'gdragon',
        email: 'gdragon@usako.net',
      }

      cy.putUser(validUserId, requestBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
      })
    })
  })
})
