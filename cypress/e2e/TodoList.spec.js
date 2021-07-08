describe('Testing todo list', () => {
    it('testing add todos', () => {
        cy.visit('/')
        let inititalLenght = 0;
        cy.findByTestId('list-item')
            .children()
            .then(($) => {
                inititalLenght = $.length;

                cy.get('#todo').type('test cypress')
                    .get('#tag').select('pleasure')
                    .get('.ml-3').click()
                cy.findByTestId('list-item')
                    .children()
                    .its('length')
                    .should('eq', inititalLenght + 1)
            });
    })
    it('remove todo tested', () => {
        cy.visit('/');
        cy.findByTestId('list-item')
            .children()
            .contains('test cypress')
            .children('button')
            .click();
        cy.findByTestId('list-item')
            .children()
            .contains('test cypress')
            .should('not.exist');
    })
})