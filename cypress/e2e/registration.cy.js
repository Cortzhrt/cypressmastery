/// <reference types ="cypress" />

beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm')
  });

it('Should register a user successfully' ,() => {
    cy.RegisterFunction()
})

it('Should log the user In', ()=> {

    cy.LogInFunction()
    
})

it('Should log the user Out', ()=>{

    cy.LogInFunction()
    cy.get('a[href="logout.htm"]').should('contain', 'Log Out').click();

}) 



