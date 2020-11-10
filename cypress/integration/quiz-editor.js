describe('Quiz Editor', () => {
    it('should show editor with new quiz', () => {
        cy.server()
        // Get a new quiz
        cy.route('GET', '/api/quizzes/0x70530', 'fixture:new-quiz')

        cy.clock()
        cy.visit("/quizzes/0x70530")
        cy.tick(100)
        cy.get('input').should('have.value', '新規クイズ')
        cy.get('.ui.label').first().should('have.text', 'minq')
        cy.get('textarea').eq(0).should('have.value', '我思う')
        cy.get('textarea').eq(1).should('have.value', '故に我あり')
        cy.tick(200)
    })
})