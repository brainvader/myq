describe('Quiz List', () => {
    it('should show quiz list', () => {
        cy.visit("/quizzes")
        cy.findByText('MinQとは何でしょうか?').should('exist')
    });
});