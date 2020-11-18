import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (edgeName) => (`
query cells($uid: string) {
    cells(func: uid($uid)) {
        ${edgeName} {
            uid
            type
            order
            content
        }
    }
}`)

const insertCell = async (req, res) => {
    const { uid } = req.query
    const { edgeName, index } = req.body

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const vars = { $uid: uid }
        const result = await txn.queryWithVars(query(edgeName), vars)
        const [{ [edgeName]: cells }] = result.data.cells

        const newCell = {
            uid: `_:new${edgeName}`,
            type: 'text',
            order: index,
            content: edgeName === 'question' ? `問${index}` : `答${index}`
        }

        const newCells = cells.map(cell => {
            if (cell.order >= index) cell.order++
            return cell
        })
        newCells.splice(index, 0, newCell)

        const newQuiz = {
            uid: uid,
            [edgeName]: newCells
        }

        const inserted = await txn.mutate({ setJson: newQuiz, commitNow: true });
        const uids = inserted.data.uids
        res.json(uids)
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }

}

// TODO: Use POST verb for insertCell
handler.put(insertCell)

export default handler