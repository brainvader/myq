describe('Title input', () => {
    it.only('should edit new title', () => {
        cy.server()
        // Create a new quiz
        cy.route('POST', '/api/quizzes', 'fixture:new-quiz')
        // Get a created quiz
        cy.route('GET', '/api/quizzes/0x70530', 'fixture:new-quiz')

        // visit home page
        cy.visit("/quizzes")

        cy.clock()
        cy.get('.create-quiz-btn')
            .click()
        cy.url()
            .should('include', '/quizzes/0x70530')
        cy.tick(100)
        cy.get('.title-input')
            .children('input')
            .clear() // clear field
            .type('What is MinQ?')
            .should('have.value', 'What is MinQ?')
        cy.tick(100)
    })
})