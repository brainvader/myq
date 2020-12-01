import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const updateCells = async (req, res) => {
    const { cells } = req.body

    console.log('cells', cells);

    const txn = req.dbClient.newTxn()

    try {
        const updated = await txn.mutate({ setJson: cells, commitNow: true });
        res.json({ cells: cells })
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

handler.put(updateCells)

export default handler