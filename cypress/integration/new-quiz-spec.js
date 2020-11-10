const timeStamp = '2020-11-09T21:57:34Z'

const newQuiz = {
    uid: "0x70530",
    title: "What is Cypress.js",
    user: "myq",
    date: timeStamp,
    question: [
        {
            type: 'text',
            content: 'What is Cypress.js',
            order: 0
        }
    ],
    answer: [
        {
            type: 'text',
            content: 'E2E testing library',
            order: 0
        }
    ],
    "tags": [
        {
            tag_name: 'cypress'
        }
    ]
}


describe('New Quiz', () => {
    it.only('should create new quiz', () => {
        cy.server()
        // Stub route
        cy.route('POST', '/api/quizzes', newQuiz).as('addQuiz')
        cy.route('GET', '/api/quizzes/0x70530', newQuiz)

        // visit home page
        cy.visit("/quizzes")

        // click button
        cy.get('.create-quiz-btn').click()

        // redirect occurred here

        // control time explicitly
        cy.clock()
        // check url after redirection
        cy.url().should('include', '/quizzes/0x70530')
        cy.tick(1000)
    })
})