import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const updateCell = async (req, res) => {
    const { cell } = req.body

    console.log(cell)

    const txn = req.dbClient.newTxn()

    try {
        const updated = await txn.mutate({ setJson: cell, commitNow: true });
        res.json({ uid: cell.uid })
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

handler.put(updateCell)

export default handler