/// <reference types ="cypress" />

beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm')
  });

it('Should register a user successfully' ,() => {
    cy.get('input[id="customer.firstName"]').type('John')
    cy.get('input[id="customer.lastName"]').type('Doe')
    cy.get('input[id="customer.address.street"]').type('Milky street')
    cy.get('input[id="customer.address.city"]').type('Jupiter city')
    cy.get('input[id="customer.address.state"]').type('US of A')
    cy.get('input[id="customer.address.zipCode"]').type('1298')
    cy.get('input[id="customer.phoneNumber"]').type('0928123456')
    cy.get('input[id="customer.ssn"]').type('123456')
    cy.get('input[id="customer.username"]').type('JohnDoe1')
    cy.get('input[id="customer.password"]').type('Henson_rule34')
    cy.get('input[id="repeatedPassword"]').type('Henson_rule34')
    cy.get('[colspan="2"] > .button').click();
})

it('Should log the user In', ()=> {

    cy.get('input[name="username"]').type('JohnDoe1')
    cy.get('input[name="password"]').type('Henson_rule34')
    cy.get(':nth-child(5) > .button').click()
    
})

it('Should log the user Out', ()=>{

    cy.LogInFunction()
    cy.get('a[href="logout.htm"]').should('contain', 'Log Out').click();

}) 



