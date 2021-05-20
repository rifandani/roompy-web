/// <reference types="cypress" />

describe('users API test: /api/users', () => {
  const invalidUserId = 'as097801243hnasfasfhjxxx'
  const premiumUserId = 'gjLF9J9LcJXcqtoNl5NxVNTi4Sl2'

  const newUser = {
    id: 'username12345',
    username: 'username',
    email: 'username@email.com',
  }

  before(() => {
    // create a new account before deleting it
    cy.registerUser(newUser).as('registerUser')
  })

  // GET /
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
      cy.getUser(newUser.id).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.be.a('string')
        expect(response.body.createdAt).to.be.a('number')
        expect(response.body.premium).to.be.a('boolean')
      })
    })
  })

  // PUT /
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

      cy.putUser(newUser.id, requestBody).should((response) => {
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

      cy.putUser(newUser.id, requestBody).should((response) => {
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

      cy.putUser(newUser.id, requestBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
      })
    })
  })

  // DELETE /id={userId}
  context('with DELETE request', () => {
    // ERROR - invalid request.query.id
    it('should ERROR deleting user - invalid request.query.id', () => {
      cy.deleteUser(invalidUserId).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property(
          'message',
          'Invalid query user id'
        )
      })
    })

    // ERROR - user is premium
    it('should ERROR deleting user - user is premium', () => {
      cy.deleteUser(premiumUserId).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property(
          'message',
          'You can not delete a premium user'
        )
      })
    })

    // SUCCESS - valid request.query.id & user is not premium
    it('should SUCCESS deleting user - valid request.query.id & user is not premium', () => {
      cy.deleteUser(newUser.id).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('error', false)
        expect(response.body).to.have.property(
          'message',
          'User deleted successfully'
        )
      })
    })
  })
})
