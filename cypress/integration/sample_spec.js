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

describe('Home Page', () => {
    it('should render home page', () => {
        cy.server()
        cy.visit("/quizzes")
    })
})