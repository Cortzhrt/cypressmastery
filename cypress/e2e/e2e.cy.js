describe('template spec', () => {
  /*
  it('passes', () => {
    cy.visit('https://saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.contains('Swag Labs').should('be.visible')
    cy.url().should('include', 'inventory')
  }) */

  it('Test Fail', () => {
  cy.visit('https://saucedemo.com')
  cy.get('[data-test="username"]').type('randomdroprateup')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
})
})

