describe('Home Page', () => {
    it('should show home page', () => {
        cy.visit('/')
        // wait for redirect completed
        cy.wait(1000)
        cy.location('pathname').should('eq', '/')
    });
});