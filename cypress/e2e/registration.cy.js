/// <reference types="cypress" />
describe('Parabank Registration', () => {
    beforeEach(() => {
      cy.clearAllSessionStorage()
      cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    });

    it('Should successfully register a Customer using Faker JS', () => {
        cy.fillRegistrationForm()
    });

    it("Should ", () => {
        cy.contains('a', 'home').click()
        cy.get('input.button')
    })

});