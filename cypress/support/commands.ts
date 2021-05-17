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
