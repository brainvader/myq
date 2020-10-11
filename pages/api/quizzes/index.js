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

const getQuizzes = async (req, res) => {
    const result = await req.dbClient.newTxn().query(quizzesQuery)
    const quizzes = result.data.quizzes
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(quizzes))
}

const addQuiz = async (req, res) => {
    const createdAt = req.body.createdAt
    const client = req.dbClient
    const txn = client.newTxn()

    const quiz = {
        uid: "_:newQuiz",
        title: '新規クイズ',
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