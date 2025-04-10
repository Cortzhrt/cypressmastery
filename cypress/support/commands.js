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

  //4-10-2025
  //NEW ACTIVITY COMMANDS
  //USED IN REGISTRATION.CY.JS

  import { faker } from '@faker-js/faker';  // Import Faker.js

  Cypress.Commands.add('generateData' , () => {
    let testData = generateTestData()
    cy.writeFile('cypress/fixtures/testData.json', testData);
  });
   


export const generateTestData = () => {

    let userNameString = faker.person.firstName()
    let userNameNumeric = faker.string.numeric(4)
    let userName = userNameString + userNameNumeric;

    return {
      firstName: userNameString,
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11),
      ssn: faker.string.numeric(9), // Example SSN as UUID
      username: userName,
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode()
    };
  };

  /*
  Cypress.Commands.add('RegisterFunction', ()=> {
    cy.get('input[id="customer.firstName"]').type('John')
    cy.get('input[id="customer.lastName"]').type('Doe')
    cy.get('input[id="customer.address.street"]').type('Milky street')
    cy.get('input[id="customer.address.city"]').type('Jupiter city')
    cy.get('input[id="customer.address.state"]').type('US of A')
    cy.get('input[id="customer.address.zipCode"]').type('1298')
    cy.get('input[id="customer.phoneNumber"]').type('0928123456')
    cy.get('input[id="customer.ssn"]').type('123456')
    cy.get('input[id="customer.username"]').type(userName)
    cy.get('input[id="customer.password"]').type(passWord)
    cy.get('input[id="repeatedPassword"]').type(passWord)
    cy.get('[colspan="2"] > .button').click();
  })

  */

  //Custom Command for the registration.cy.js function on logout
  Cypress.Commands.add('LogInFunction', () => {
    cy.fixture('testData.json').then((data) => {
      cy.get('input[name="username"]').type(data.username);
      cy.get('input[name="password"]').type(data.password);
      cy.get(':nth-child(5) > .button').click();
    });
  });

  Cypress.Commands.add('AdminClear', () => {

    cy.get('tr > :nth-child(2) > .button').click()
    cy.get('button[value="CLEAN"]').click()


  })