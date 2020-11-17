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

    // get a parent node from a cell with reverse edge
    const { parents: [parent] } = result.data
    const { [`~${edgeName}`]: quizzes } = parent
    const [quiz] = quizzes
    const { [edgeName]: cells } = quiz

    // swap the cell orders
    const [movedOver] = (cells || [])
        // find the cell to move over
        .filter(cell => cell.order === newOrder)
        // Update the cell order
        .map(cell => ({ uid: cell.uid, order: original.order }))
    // update original cell with new order
    const moved = { uid: original.uid, order: newOrder }

    const swappedCells = [movedOver, moved]
    await txn.mutate({ setJson: swappedCells, commitNow: true });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({ swapped: [moved.uid, movedOver.uid] })
}

handler.put(swapCells)

export default handler