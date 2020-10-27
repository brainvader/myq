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
                order
                type
                content
            }
            answer {
                uid
                order
                type
                content
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
    const txn = client.newTxn();

    try {
        const original = await client.newTxn().query(getQuizzQuery(quiz.uid))
        console.log('original', original.data.quiz[0].tags.join(','))

        const txn = client.newTxn()
        const result = await txn.mutate({ setJson: quiz })

        const post = await client.newTxn().query(getQuizzQuery(quiz.uid))
        await txn.commit();
        console.log('new', post.data.quiz[0].tags.join(','))

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(quiz)
    } catch (e) {
        throw e
    } finally {
        await txn.discard();
    }

}

handler.get(getQuiz)
handler.put(saveQuiz)

export default handler;