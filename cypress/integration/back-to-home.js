describe('Back to home', () => {
    it('should go back home', () => {
        cy.server()

        // Get several quizzes grouped by page
        cy.route('GET', '/api/quizzes?page=1', 'fixture:quizzes')
        // Create a new quiz with default values
        cy.route('POST', '/api/quizzes', 'fixture:new-quiz')
        // Get the created quiz
        cy.route('GET', '/api/quizzes/0x70530', 'fixture:new-quiz')

        // visit home page
        cy.visit("/quizzes")

        cy.clock()
        {
            cy.get('.create-quiz-btn').click()
            cy.url().should('include', '/quizzes/0x70530')
        }
        cy.tick(100)
        {
            cy.get('.home-btn').click()
            cy.url().should('include', '/quizzes')
        }
    })
})