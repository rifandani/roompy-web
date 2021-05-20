// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// POST /api/qrcode
Cypress.Commands.add('postQrcode', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/qrcode',
    body: requestBody,
    failOnStatusCode: false,
  })
})

// GET /api/users
Cypress.Commands.add('getUsers', () => {
  return cy.request({
    method: 'GET',
    url: '/api/users',
  })
})

// GET /api/user?id={userId}
Cypress.Commands.add('getUser', (id) => {
  return cy.request({
    method: 'GET',
    url: '/api/users',
    qs: {
      id,
    },
    failOnStatusCode: false,
  })
})

// PUT /api/users
Cypress.Commands.add('putUser', (id, requestBody) => {
  return cy.request({
    method: 'PUT',
    url: '/api/users',
    body: requestBody,
    qs: {
      id,
    },
    failOnStatusCode: false,
  })
})

// DELETE /api/users
Cypress.Commands.add('deleteUser', (id) => {
  return cy.request({
    method: 'DELETE',
    url: '/api/users',
    qs: {
      id,
    },
    failOnStatusCode: false,
  })
})

// POST /api/auth/register
Cypress.Commands.add('registerUser', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/register',
    failOnStatusCode: false,
    body: requestBody,
  })
})
