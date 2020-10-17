import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const quizzesQuery = `
{
    quizzes(func: has(title)) {
        uid
        title
        date
        question {
            uid
        }
        answer {
            uid
        }
        tags
    }
}`

const QUIZ_PER_PAGE = 10

const getVisibleRange = (index) => {
    const start = (index - 1) * QUIZ_PER_PAGE
    const end = start + QUIZ_PER_PAGE
    return [start, end]
}

const getQuizzes = async (req, res) => {
    const { page } = req.query
    const result = await req.dbClient.newTxn().query(quizzesQuery)
    const allQuizzes = result.data.quizzes
    const totalQuizzes = allQuizzes.length

    const totalPages = Math.ceil(totalQuizzes / QUIZ_PER_PAGE)

    const [start, end] = getVisibleRange(page)
    const quizzes = allQuizzes.slice(start, end)

    const body = {
        totalQuizzes: totalQuizzes,
        totalPages: totalPages,
        quizzes: quizzes
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(body)
}

const addQuiz = async (req, res) => {
    const createdAt = req.body.createdAt
    const client = req.dbClient
    const txn = client.newTxn()

    const quiz = {
        uid: '_:newQuiz',
        title: '新規クイズ',
        user: 'brainvader',
        date: createdAt,
        question: [{
            type: 'text',
            content: '我思う'
        }],
        answer: [{
            type: 'text',
            content: '故に我あり'
        }],
        tags: ['']
    }

    const result = await txn.mutate({ setJson: quiz, commitNow: true })

    console.log(`create quiz with uid: ${result.data.uids.newQuiz}`)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({ uid: result.data.uids.newQuiz })
}

const deleteQuiz = async (req, res) => {
    const quiz = req.body.quiz
    const uid = quiz.uid
    console.info(`delete quiz ${uid}`)

    const [question] = quiz.question === undefined ? [null] : quiz.question
    const [answer] = quiz.answer === undefined ? [null] : quiz.answer

    const questionField = question ? { question: { uid: question.uid } } : {}
    const answerField = answer ? { answer: { uid: answer.uid } } : {}

    const client = req.dbClient
    const txn = client.newTxn()
    const deleteJson = {
        uid: uid,
        title: null,
        ...questionField,
        ...answerField
    }

    const result = await txn.mutate({
        deleteJson: deleteJson,
        commitNow: true,
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({ uid: '201' })
}

handler.get(getQuizzes)
handler.post(addQuiz)
handler.delete(deleteQuiz)

export default handler;