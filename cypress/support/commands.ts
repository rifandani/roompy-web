// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

/* ------------------------------------------- helpers ------------------------------------------ */

Cypress.Commands.add('dataCy', (dataTestAttribute, args) => {
  return cy.get(`[data-cy=${dataTestAttribute}]`, args)
})

/* --------------------------------------------- api -------------------------------------------- */

// POST /api/auth/login
Cypress.Commands.add('loginByApi', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: requestBody,
    failOnStatusCode: false,
  })
})

// POST /api/auth/register
Cypress.Commands.add('registerByApi', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/register',
    body: requestBody,
    failOnStatusCode: false,
  })
})

// POST /api/qrcode
Cypress.Commands.add('postQrcode', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/qrcode',
    body: requestBody,
    failOnStatusCode: false,
  })
})

/* --------------------------------------------- UI --------------------------------------------- */

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
