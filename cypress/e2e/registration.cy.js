/// <reference types ="cypress" />

beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm')
  });

it('Should register a user successfully' ,() => {
    //cy.AdminClear()
    cy.generateData()

    cy.fixture('testData.json').then((user) => {
        cy.get('input[id="customer.firstName"]').should('have.value', '').type(user.firstName);
        cy.get('input[id="customer.lastName"]').should('have.value', '').type(user.lastName);
        cy.get('input[id="customer.address.street"]').should('have.value', '').type(user.address);
        cy.get('input[id="customer.address.city"]').should('have.value', '').type(user.city);
        cy.get('input[id="customer.address.state"]').should('have.value', '').type(user.state);
        cy.get('input[id="customer.address.zipCode"]').should('have.value', '').type(user.zip);
        cy.get('input[id="customer.phoneNumber"]').should('have.value', '').type(user.phone);
        cy.get('input[id="customer.ssn"]').should('have.value', '').type(user.ssn);
        cy.get('input[id="customer.username"]').should('have.value', '').type(user.username);
        cy.get('input[id="customer.password"]').should('have.value', '').type(user.password);
        cy.get('input[id="repeatedPassword"]').should('have.value', '').type(user.password);
    });
    cy.get('[colspan="2"] > .button').click()
})

it('Should log the user In', ()=> {

    cy.LogInFunction()
    
})

it('Should log the user Out', ()=>{

    cy.LogInFunction()
    cy.get('a[href="logout.htm"]').should('contain', 'Log Out').click();

}) 



