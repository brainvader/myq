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

handler.get(getQuizzes)

export default handler;