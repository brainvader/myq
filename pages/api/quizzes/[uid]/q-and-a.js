import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (nodeName) => (`
query cells($uid: string) {
    cells(func: uid($uid)) {
        ${nodeName} {
            uid
            type
            order
            content
        }
    }
}`)

const insertCell = async (req, res) => {
    const { uid } = req.query
    const { nodeName, index } = req.body
    console.log(`insert at ${index} of ${nodeName}`)
    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const vars = { $uid: uid }
        const result = await txn.queryWithVars(query(nodeName), vars)
        const [{ [nodeName]: cells }] = result.data.cells
        console.log('cells: ', cells)

        const newCell = {
            uid: `_:new${nodeName}`,
            type: 'text',
            order: index,
            content: nodeName === 'question' ? `問${index}` : `答${index}`
        }
        const newCells = cells.map(cell => {
            if (cell.order >= index) cell.order++
            return cell
        })
        newCells.splice(index, 0, newCell)
        console.log(newCells)
        const newQuiz = {
            uid: uid,
            [nodeName]: newCells
        }
        console.log(newQuiz)
        const inserted = await txn.mutate({ setJson: newQuiz, commitNow: true });
        const uids = inserted.data.uids
        console.log(uids)
        res.json(uids)
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }

}

handler.put(insertCell)

export default handler