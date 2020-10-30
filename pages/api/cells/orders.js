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
    console.log(edgeName)

    const vars = { $uid: original.uid }
    console.log(vars)
    console.log(edgeName)
    const txn = req.dbClient.newTxn()
    const result = await txn.queryWithVars(query(edgeName), vars)

    // TODO: pass quiz uid directly as path parameter
    const { parents: [parent] } = result.data
    console.log(parent)
    const { [`~${edgeName}`]: quizzes } = parent
    console.log(quizzes)
    const [quiz] = quizzes
    console.log(quiz)
    const { [edgeName]: cells } = quiz

    const [movedOver] = (cells || [])
        .filter(cell => cell.order === newOrder)
        .map(cell => ({ ...cell, order: original.order }))
    const moved = { uid: original.uid, order: newOrder }

    const swappedCells = [movedOver, moved]
    const cellSwapped = await txn.mutate({ setJson: swappedCells, commitNow: true });

    console.log(cellSwapped.data)
    res.json({ swapped: [moved.uid, movedOver.uid] })
}

handler.put(swapCells)

export default handler