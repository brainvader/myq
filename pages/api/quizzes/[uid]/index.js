import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

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
            tags {
                uid
                tag_name
            }
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
    const original = await client.newTxn().query(getQuizzQuery(quiz.uid))
    console.log('original', original.data.quiz[0].tags.join(','))

    const txn = client.newTxn()
    const result = await txn.mutate({ setJson: quiz, commitNow: true })

    const post = await client.newTxn().query(getQuizzQuery(quiz.uid))
    console.log('new', post.data.quiz[0].tags.join(','))

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(quiz)
}

handler.get(getQuiz)
handler.put(saveQuiz)

export default handler;