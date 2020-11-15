describe('Quiz List', () => {
    it('should show quiz list', () => {
        cy.visit("/quizzes")

        // TODO: replace get with findBy*
        //  see https://docs.cypress.io/faq/questions/using-cypress-faq.html#How-do-I-get-an-element%E2%80%99s-text-contents
        cy.get('tr')
            .eq(1) // get the first child
            .children(':nth-child(2)') // get the second td elements
            .should('contain', 'MinQとは何でしょうか?')
        // .should('have.text', 'MinQとは何でしょうか?')
    });
});