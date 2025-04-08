// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

// Custom Command to log in
Cypress.Commands.add('auth', (username, password) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
  
  // Custom Command to add a product to the cart
  Cypress.Commands.add('addToCart', (productDataTest) => {
    cy.get(`[data-test="add-to-cart-${productDataTest}"]`)
      .should('be.visible')
      .click();
  });
  
  // Custom Command to verify that the cart contains at least one item
  Cypress.Commands.add('verifyCart', () => {
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);
  });
  
  // Custom Command to proceed to the checkout page and complete the purchase
  Cypress.Commands.add('proceedToCheckout', (firstName, lastName, postalCode) => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
  });
  
  // Custom Command to take a screenshot during checkout
  Cypress.Commands.add('screenshotCheckout', () => {
    cy.screenshot('CheckOut', { capture: 'fullPage' });
  });
  