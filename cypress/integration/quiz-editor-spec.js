describe('Quiz Editor', () => {
    it('should show editor', () => {
        cy.visit("/quizzes")
        cy.wait(1000)

        cy.findAllByRole('button')
            .eq(3)
            .click()
        cy.wait(2000)

        cy.clock()
        cy.findAllByRole('textbox').eq(0).should('have.value', 'MinQとは何でしょうか?')
        cy.tick(1000)
    })
})