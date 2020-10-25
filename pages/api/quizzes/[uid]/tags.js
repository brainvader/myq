import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = `
query tag($uid: string){
    tags(func: uid($uid)) {
        tags {
            uid
            tag_name
        }
    }
}`

const getTags = async (req, res) => {
    const { uid } = req.query
    const vars = { $uid: uid }
    const result = await req.dbClient.newTxn().queryWithVars(query, vars)
    const tags = result.data.tags
    res.json(tags)
}

const addTag = async (req, res) => {
    const { uid } = req.query
    const { tag } = req.body

    const quiz = {
        uid: uid,
        tags: [
            {
                uid: tag.uid,
                tag_name: tag.tag_name
            }
        ]
    }

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const tagged = await txn.mutate({ setJson: quiz, commitNow: true });
        const newTag = tagged.data.uids
        res.json(newTag)
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

const detachTag = async (req, res) => {
    const { uid } = req.query
    const { tag } = req.body

    const deleteJson = {
        uid: uid,
        tags: [
            {
                uid: tag.uid,
                tag_name: null
            }
        ]
    }

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const untagged = await txn.mutate({ deleteJson: deleteJson, commitNow: true });
        res.json(untagged.data)
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

handler.get(getTags)
handler.put(addTag)
handler.delete(detachTag)

export default handler