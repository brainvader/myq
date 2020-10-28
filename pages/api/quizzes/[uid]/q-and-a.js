import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (nodeType) => (`
query cells($uid: string) {
    cells(func: uid($uid)) {
        ${nodeType} {
            uid
            type
            order
            content
        }
    }
}`)

const insertCell = async (req, res) => {
    const { uid } = req.query
    const { nodeType, index } = req.body
    console.log(`insert at ${index} of ${nodeType}`)
    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const vars = { $uid: uid }
        const result = await txn.queryWithVars(query(nodeType), vars)
        const [{ [nodeType]: cells }] = result.data.cells
        console.log('cells: ', cells)

        const newCell = {
            uid: `_:new${nodeType}`,
            type: 'text',
            order: index,
            content: nodeType === 'question' ? `問${index}` : `答${index}`
        }
        const newCells = cells.map(cell => {
            if (cell.order >= index) cell.order++
            return cell
        })
        newCells.splice(index, 0, newCell)
        console.log(newCells)
        const newQuiz = {
            uid: uid,
            [nodeType]: newCells
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