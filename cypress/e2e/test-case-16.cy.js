/// <reference types ="cypress" />

beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  });

  it('Verify that the index is visible', () => {
    cy.get('.shop-menu > .nav > :nth-child(1)').should('contain', 'Home')
  })

    it('Register first for account to exist', () => {
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        cy.UserRegistrationAE()
    })

    it('User Login before Checkout', ()=>{
        cy.get(':nth-child(4) > a > .fa').click()
        cy.userLoginAE()
        cy.get(':nth-child(7) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('.modal-footer > .btn').click()
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.get('.col-sm-6 > .btn').click()
        cy.checkOutAE()
    })
  it('verify account deleted successfuly', () => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.userLoginAE()
      cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
      cy.get('[data-qa="continue-button"]').click
  })