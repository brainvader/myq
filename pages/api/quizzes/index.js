import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const getTimeStamp = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const now = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    const timeStamp = new Date(now).toISOString()
    return timeStamp
}

const quizzesQuery = `
{
    quizzes(func: has(title)) {
        uid
        title
        date
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