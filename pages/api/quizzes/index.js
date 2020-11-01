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
        tags {
            uid
            tag_name
        }
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

    // get only the quizzes that can be　displayed in a single page, i.e. pagination
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

// create a blank quiz node
const addQuiz = async (req, res) => {
    const createdAt = req.body.createdAt
    const client = req.dbClient
    const txn = client.newTxn()

    const quiz = {
        "uid": "_:newQuiz", // blank node
        "title": "新規クイズ",
        "user": "brainvader",
        "date": `${createdAt}`,
        "question": [
            {
                "order": 0,
                "type": "text",
                "content": "我思う"
            }
        ],
        "answer": [
            {
                "order": 0,
                "type": "text",
                "content": "故に我あり"
            }
        ],
        "tags": []
    }

    const result = await txn.mutate({ setJson: quiz, commitNow: true })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({ uid: result.data.uids.newQuiz })
}

const getQuizzQuery = (uid) => {
    return `
    {
        quiz(func: uid(${uid})) {
            uid
            question {
                uid
            }
            answer {
                uid
            }
            tags {
                uid
            }
        }
    }`
}


// TODO: Update delete logic
const deleteQuizzes = async (req, res) => {
    const uids = req.body.uids

    const quizzes = await Promise.all(uids.map(async (uid) => {
        const result = await req.dbClient.newTxn().query(getQuizzQuery(uid))
        const [quiz] = result.data.quiz
        return quiz
    }))

    const deleted = await Promise.all(quizzes.map(async (quiz) => {
        const uid = quiz.uid

        // TODO: Data
        const [question] = quiz.question === undefined ? [null] : quiz.question
        const [answer] = quiz.answer === undefined ? [null] : quiz.answer
        const [tags] = quiz.tags === undefined ? [null] : quiz.tags

        const questionField = question ? { question: { uid: question.uid } } : {}
        const answerField = answer ? { answer: { uid: answer.uid } } : {}
        const tagsField = tags ? { tags: { uid: tags.uid } } : {}

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
        return quiz.uid
    }))

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({ deleted: deleted })
}

handler.get(getQuizzes)
handler.post(addQuiz)
handler.delete(deleteQuizzes)

export default handler;