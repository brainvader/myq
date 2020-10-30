import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);


const updateTitle = async (req, res) => {
    const { uid } = req.query
    const { title } = req.body
    const txn = req.dbClient.newTxn();

    try {
        const newQuiz = {
            uid: uid,
            title: title
        }
        const result = await txn.mutate({ setJson: newQuiz })
        await txn.commit();
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(newQuiz)
    } catch (e) {
        throw e
    } finally {
        await txn.discard();
    }
}

handler.put(updateTitle)

export default handler