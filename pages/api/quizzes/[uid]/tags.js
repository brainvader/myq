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

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        const quiz = {
            uid: uid,
            tags: [
                {
                    uid: tag.uid,
                    tag_name: tag.tag_name
                }
            ]
        }
        const result = await txn.mutate({ setJson: quiz, commitNow: true });
        const tagged = result.data.uids
        res.json(tagged)
    } catch (error) {
        throw error
    } finally {
        await txn.discard()
    }
}

const queryQuizzesFromTag = `
query tag($uid: string) {
    tag(func: uid($uid)) {
        ~tags {
            count(uid)
        }
    }
}`

const detachTag = async (req, res) => {
    const { uid } = req.query
    const { tag } = req.body

    const client = req.dbClient
    const txn = client.newTxn()

    try {
        // Check how many quizzes reference to a given tag
        const vars = { $uid: tag.uid }
        const quizzesFromTag = await txn.queryWithVars(queryQuizzesFromTag, vars)
        const [{ [`~tags`]: [taggedQuiz] }] = quizzesFromTag.data.tag
        const count = parseInt(taggedQuiz.count)

        // Delete a given tag if there are no references
        const isDelete = (count - 1) === 0 ? true : false

        const deleteJson = {
            uid: uid,
            tags: [
                isDelete
                    ? { uid: tag.uid, tag_name: null }
                    : { uid: tag.uid }
            ]
        }

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