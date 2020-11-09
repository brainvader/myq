describe('Home Page', () => {
    it('should render home page', () => {
        cy.server()
        cy.visit("/quizzes")
    })
})