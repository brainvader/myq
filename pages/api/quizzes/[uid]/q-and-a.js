import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (type) => (`
query cells($uid: string) {
    cells(func: uid($uid)) {
        ${type} {
            uid
            type
            order
            content
        }
    }
}`)

const insert = async (req, res) => {
    const { uid } = req.query
    const { type, index } = req.body
    console.log(`insert at ${index} of ${type}`)
    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const vars = { $uid: uid }
        const result = await txn.queryWithVars(query(type), vars)
        const [{ [type]: cells }] = result.data.cells
        console.log('cells: ', cells)

        const newCell = {
            uid: `_:new${type}`,
            type: 'text',
            order: index,
            content: type === 'question' ? `問${index}` : `答${index}`
        }
        const newCells = cells.map(cell => {
            if (cell.order >= index) cell.order++
            return cell
        })
        newCells.splice(index, 0, newCell)
        console.log(newCells)
        const newQuiz = {
            uid: uid,
            [type]: newCells
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

handler.put(insert)

export default handler