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

import {generateTestData} from "../support/util.js"
import RegistrationPage from './pages/registration.page.js';

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

  //NEW COMMANDS FOR SAUCE DEMO 4-11-25

  // Log in to SauceDemo with standard credentials
Cypress.Commands.add('authSauceDemo', () => {
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('saveCart', () => {
  cy.window().then((win) => {
    const cart = win.localStorage.getItem('cart-contents') || '[]';
    Cypress.env('savedCart', cart);
  });
});

Cypress.Commands.add('restoreCart', () => {
  const cart = Cypress.env('savedCart') || '[]';
  cy.window().then((win) => {
    win.localStorage.setItem('cart-contents', cart);
  });
});

// NEW COMMANDS FOR THE AUTOMATION EXERCISE ACTIVITY

Cypress.Commands.add ('checkCartAE',() =>{

  cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
  cy.get('.modal-footer > .btn').click()
  cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
  cy.get('.cart_quantity').should('not.be', "0")
  cy.get('.col-sm-6 > .btn').click()
  cy.get('.modal-body > :nth-child(2) > a > u').click()

})

Cypress.Commands.add ('accountRegistrationAE', () => {

  cy.get('[data-qa="signup-name"]').type('John Doughnut')
  cy.get('[data-qa="signup-email"]').type('johndoughnut1@gmail.com')
  cy.get('[data-qa="signup-button"]').click()
  cy.get('#id_gender1').click()
  cy.get('[data-qa="password"]').type('Holalolazola1!')
  cy.get('[data-qa="days"]').select('12')
  cy.get('[data-qa="months"]').select('January')
  cy.get('[data-qa="years"]').select('1992')
  cy.get('[data-qa="first_name"]').type('John')
  cy.get('[data-qa="last_name"]').type('Doughnut')
  cy.get('[data-qa="company"]').type('Metrocampbankco')
  cy.get('[data-qa="address"]').type('rebengga')
  cy.get('[data-qa="country"]').select('Canada')
  cy.get('[data-qa="state"]').type('united')
  cy.get('[data-qa="city"]').type('femboi city')
  cy.get('[data-qa="zipcode"]').type('1243')
  cy.get('[data-qa="mobile_number"]').type('12345678912')
  cy.get('[data-qa="create-account"]').click()


})

// Cypress.Commands.add('generateData' , () => {
//   let testData = generateTestData()
//   cy.writeFile('cypress/fixtures/automation_exercise.json', testData);
// });
 


Cypress.Commands.add('generateData' , () => {
  let testData = generateTestData()
  cy.writeFile('cypress/fixtures/testData.json', testData);
});

Cypress.Commands.add('userLoginAE', ()=> {
  cy.readFile('cypress/fixtures/testData.json').then((user)=>{
    cy.get('input[type="email"][data-qa="login-email"][name="email"]').type(user.email)
    cy.get('input[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()

  })
})

Cypress.Commands.add('UserRegistrationAE', () => {

  cy.fixture('testData.json').then((user) =>{
  cy.get('[data-qa="signup-name"]').should('have.value', '').type(user.firstName);
  cy.get('[data-qa="signup-email"]').should('have.value', '').type(user.email);
  cy.get('[data-qa="signup-button"]').click()

  cy.get('[data-qa="password"]').should('have.value', '').type(user.password);
  cy.get('[data-qa="days"]').select(user.birthday);
  cy.get('[data-qa="months"]').select(user.birthmonth);
  cy.get('[data-qa="years"]').select('2006');
  cy.get('[data-qa="first_name"]').should('have.value', '').type(user.firstName);
  cy.get('[data-qa="last_name"]').should('have.value', '').type(user.lastName)
  cy.get('[data-qa="company"]').type('Jeonsoft')
  cy.get('[data-qa="address"]').should('have.value', '').type(user.address)
  cy.get('[data-qa="country"]').select('India')
  cy.get('[data-qa="state"]').should('have.value', '').type(user.state)
  cy.get('[data-qa="city"]').should('have.value', '').type(user.city)
  cy.get('[data-qa="zipcode"]').should('have.value', '').type(user.zip)
  cy.get('[data-qa="mobile_number"]').should('have.value', '').type(user.phone)
        
  cy.get('[data-qa="create-account"]').click()
  cy.get('[data-qa="continue-button"]').click()
  cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
      })
    })

  Cypress.Commands.add('checkOutAE', () => {
      cy.readFile('cypress/fixtures/testData.json').then ((user) => {
        cy.get('.form-control').type('Testing testing 123.')
        cy.get(':nth-child(7) > .btn').click()
        cy.get('[data-qa="name-on-card"]').type(user.firstName + ' ' + user.lastName)
        cy.get('[data-qa="card-number"]').type(user.card)
        cy.get('[data-qa="cvc"]').type('325')
        cy.get('[data-qa="expiry-month"]').type('09')
        cy.get('[data-qa="expiry-year"]').type('2028')
        cy.get('[data-qa="pay-button"]').click()
        cy.get('.col-sm-9 > .btn-default').click()
        cy.get('[data-qa="continue-button"]').click()

        })
  })

  Cypress.Commands.add('fillRegistrationForm', (customerData = generateTestData()) => {
    RegistrationPage.fillSignUpForm(customerData);
    RegistrationPage.submitSignUpForm();
    RegistrationPage.verifySignUpSuccess(customerData.username);
  });