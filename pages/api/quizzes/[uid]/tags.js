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

// TODO: handler to add tag
// TODO: handler to delete tag

handler.get(getTags)

export default handler