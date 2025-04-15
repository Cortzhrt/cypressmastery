/// <reference types ="cypress" />

beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  });

  it('Verify that the index is visible', () => {
    cy.get('.shop-menu > .nav > :nth-child(1)').should('contain', 'Home')
  })

  it('Verify that you can add products to the cart and that the products are visible in the cart', () =>{

    cy.checkCartAE()

  })

  it('Should register the user successfuly', () => {

    cy.checkCartAE()

    cy.generateData()

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
    })

        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="continue-button"]').click()
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()

  })

    it('Account registration during CheckOut', () => {
      cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
      cy.readFile('cypress/fixtures/testData.json').then((user)=>{
        cy.get('input[type="email"][data-qa="login-email"][name="email"]').type(user.email)
        cy.get('input[data-qa="login-password"]').type(user.password)

        cy.get('button[data-qa="login-button"]').click()
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.get('.col-sm-6 > .btn').click()
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

  it('verify account deleted successfuly', () => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.userLoginAE()
      cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
      cy.get('[data-qa="continue-button"]').click
      const currentDate = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-US').format(currentDate).replace(/\//g, '-'); // Format as mm/dd/yy
      cy.screenshot(`Delete account screenshot_${formattedDate}`, { capture: 'fullPage' });
  })