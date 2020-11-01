import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = (edgeName) => (`
query quiz($uid: string) {
    quiz(func: uid($uid)) {
        uid
        ${edgeName} {
            uid
            order
        }
    }
}`)

const deleteCell = async (req, res) => {
    const { uid } = req.query
    const { quizUid, edgeName } = req.body

    const vars = { $uid: quizUid }
    const txn = req.dbClient.newTxn()

    try {
        const result = await txn.queryWithVars(query(edgeName), vars)
        const { quiz } = result.data
        const [{ [edgeName]: cells }] = quiz

        const removeCell = (cells || []).find(cell => cell.uid === uid)

        // remove cell
        const deleteJson = {
            uid: quizUid,
            [edgeName]: [{
                uid: removeCell.uid,
                type: null,
                content: null,
                order: null
            }]
        }
        await txn.mutate({ deleteJson: deleteJson });

        const reorderedCells = (cells || [])
            .filter(cell => cell.uid !== uid)
            .map(cell => cell.order > removeCell.order ? { ...cell, order: cell.order - 1 } : cell)

        // update the order of the rest cells
        const updateJson = {
            uid: quizUid,
            [edgeName]: reorderedCells
        }

        await txn.mutate({ setJson: updateJson });
        await txn.commit();

        res.json({ test: 'success' })
    } catch (error) {
        throw error
    } finally {
        await txn.discard();
    }
}

const updateCell = async (req, res) => {
    const { cell } = req.body

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
handler.delete(deleteCell)

export default handler