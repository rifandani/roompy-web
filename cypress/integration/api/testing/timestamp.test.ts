/// <reference types="cypress" />

describe('timestamp API test: /api/testing/timestamp', () => {
  context('with GET request', () => {
    it('should get promo with id: Lbgb6PRW9QU48I6m9GIr', () => {
      cy.request('GET', '/api/testing/timestamp').should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('error', false)
        expect(response.body.promo).to.have.property(
          'id',
          'Lbgb6PRW9QU48I6m9GIr'
        )
        expect(response.body.nowMillis).to.be.a('number')
        expect(response.body.dateNow).to.be.a('number')
      })
    })
  })
})
