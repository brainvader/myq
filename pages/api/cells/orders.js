import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (edgeName) => (`
query parents($uid: string) {
    parents(func: uid($uid)) {
        ~${edgeName} {
            uid
            ${edgeName} {
                uid
                order
            }
        }
    }
}`)

const swapCells = async (req, res) => {
    const { original, newOrder, edgeName } = req.body

    const vars = { $uid: original.uid }
    const txn = req.dbClient.newTxn()
    const result = await txn.queryWithVars(query(edgeName), vars)

    // TODO: pass quiz uid directly as path parameter
    const { parents: [parent] } = result.data
    const { [`~${edgeName}`]: quizzes } = parent
    const [quiz] = quizzes
    const { [edgeName]: cells } = quiz

    const [movedOver] = (cells || [])
        .filter(cell => cell.order === newOrder)
        .map(cell => ({ ...cell, order: original.order }))
    const moved = { uid: original.uid, order: newOrder }

    const swappedCells = [movedOver, moved]
    const cellSwapped = await txn.mutate({ setJson: swappedCells, commitNow: true });

    res.json({ swapped: [moved.uid, movedOver.uid] })
}

handler.put(swapCells)

export default handler