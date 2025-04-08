describe('E-Commerce Test Flow/Workflow', () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth('standard_user', 'secret_sauce');
  });

  it('Should successfully login', () => {
    // Verify we're on the inventory page after login
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible').log('Inventory list is visible');  // Added log for debugging

    // Take a screenshot with the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    cy.screenshot(`Login_${currentDate}`, { capture: 'fullPage' });
  });

  it('Should successfully add to cart', () => {
    // Add product to the cart and verify the cart badge
    cy.addToCart('sauce-labs-backpack');
    cy.verifyCart();

    // Take a screenshot with the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    cy.screenshot(`AddToCart_${currentDate}`, { capture: 'fullPage' });
  });

  it('Should proceed to Checkout', () => {
    // Proceed to the Checkout page and complete the purchase
    cy.get('.shopping_cart_link').click();
    cy.proceedToCheckout('John', 'Doe', '1234');

    // Take a screenshot with the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    cy.screenshot(`Checkout_${currentDate}`, { capture: 'fullPage' });

    cy.get('[data-test="back-to-products"]').click();
  });
});
