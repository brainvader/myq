import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const getQuizzQuery = (uid) => {
    return `
    {
        quiz(func: uid(${uid})) {
            uid
            title
            user
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
}

const getQuiz = async (req, res) => {
    const { uid } = req.query
    const result = await req.dbClient.newTxn().query(getQuizzQuery(uid))
    const [quiz] = result.data.quiz
    res.json(quiz)
}

const saveQuiz = async (req, res) => {
    const quiz = req.body.quiz
    const client = req.dbClient
    const txn = client.newTxn()
    const result = await txn.mutate({ setJson: quiz, commitNow: true })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(quiz)
}

handler.get(getQuiz)
handler.put(saveQuiz)

export default handler;