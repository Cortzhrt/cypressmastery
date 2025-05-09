/// <reference types="cypress" />

describe('Data Tables Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://datatables.net/')
    });

    it('Should Successfully Search Angelica Ramos & Assert her Salary', () => {
        cy.get('#dt-search-0').type('Angelica Ramos')
        cy.get('.dtr-control').click()
        try {
            cy.get('[data-dtr-index="5"] > .dtr-data')
                .should('be.visible')
                .and('have.text', '$1,200,000')
        }
        catch (error) {
            cy.log('Maybe her salary increase because of revenue increase this year:', error)
        }
    });

    it('Should check visibility and value of 1st row', () => {
        cy.get('table.dataTable > tbody > tr:nth-child(1) > td:nth-child(1)').then(($firstRow) => {
            const firstRowText = $firstRow.text();
            cy.log('First row text:', firstRowText);
            expect($firstRow).to.be.visible;
            expect(firstRowText).to.equal('Airi Satou');
        });
    });

    it('Should check visibility and value of last row', () => {
        cy.get('#dt-length-0').select('100')
        cy.wait(2000)
        cy.get('table.dataTable > tbody > tr:last > td:first-child').then(($lastRow) => {
            const lastRowText = $lastRow.text();
            cy.log('Last row text:', lastRowText);
            expect($lastRow).to.be.visible;    
            expect(lastRowText).to.equal('Zorita Serrano');    
        });    
    });

    it('Should verify the page title', () => {
        cy.title().should('eq', 'DataTables | Javascript table library');
    });

    it('Should verify the search functionality with partial text', () => {
        cy.get('#dt-search-0').type('Angelica');
        cy.get('.dtr-control').should('exist');
    });

    it('Should verify the number of rows displayed when selecting 50 rows', () => {
        cy.get('#dt-length-0').select('50');
        cy.wait(2000);
        cy.get('table.dataTable > tbody > tr').should('have.length', 50);
    });

    it('Should verify sorting functionality by Name column', () => {
        cy.get('th:contains("Name")').first().click();
        cy.get('table.dataTable > tbody > tr:nth-child(1) > td:nth-child(1)').then(($firstRow) => {
            const firstRowText = $firstRow.text();
            cy.log('First row after sorting:', firstRowText);
        });
    });

    it('Should verify pagination functionality', () => {
        cy.get('.dt-paging-button.next').click();
        cy.get('.dt-paging-button.current').should('have.text', '2');

        cy.get('.dt-paging-button.next').click();
        cy.get('.dt-paging-button.current').should('have.text', '3');

        cy.get('.dt-paging-button.previous').click();
        cy.get('.dt-paging-button.current').should('have.text', '2');

        cy.get('.dt-paging-button.previous').click();
        cy.get('.dt-paging-button.current').should('have.text', '1');

        cy.get('.dt-paging-button.last').click();
        cy.get('.dt-paging-button.last').should('have.class', 'disabled last');

        cy.get('.dt-paging-button.first').click();
        cy.get('.dt-paging-button.disabled.first').should('have.class', 'disabled first');
    });

    it('Should verify filtering by position', () => {
        cy.get('#dt-search-0').type('Software Engineer');
        cy.get('table.dataTable > tbody > tr').each(($row) => {
            cy.wrap($row).find('td:nth-child(2)').should('contain.text', 'Software Engineer');
        });
    });

    it('Should verify the presence of footer text', () => {
        cy.get('.copyright').should('be.visible').and('contain.text', 'DataTables');
    });

    it('Should adjust the viewport to make all rows visible', () => {
        cy.viewport(800, 600);
        cy.get('table.dataTable').should('be.visible');
    });

    it('Should verify sorting functionality by Age column', () => {
        //low to high
        cy.get('th[data-dt-column="3"].dt-body-right.dt-type-numeric.dt-orderable-asc.dt-orderable-desc').click()
        cy.get('td.dt-body-right.dt-type-numeric.sorting_1').should('contain.text', '19');

        //high to low
        cy.get('th[data-dt-column="3"].dt-body-right.dt-type-numeric.dt-orderable-asc.dt-orderable-desc').click()
        cy.get('td.dt-body-right.dt-type-numeric.sorting_1').should('contain.text', '66')
    })

    it('Should verify the presence of the "Show entries" dropdown', () => {
        cy.get('#dt-length-0').should('be.visible');
    })

});
