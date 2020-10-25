import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = `
query tags($search: string){
    tags(func: regexp(tag_name, $search)) {
        uid
        tag_name
    }
}`

const searchTag = async (req, res) => {
    const hasQuery = !(Object.keys(req.query).length === 0);
    const { search } = hasQuery ? req.query : { search: "" }
    if (!hasQuery || search.length < 3) {
        res.json([])
    } else {
        const vars = { $search: `/^${search}.*$/` }
        const client = req.dbClient
        const txn = client.newTxn()
        const result = await txn.queryWithVars(query, vars)
        const { tags } = result.data
        res.json(tags)
    }
}

handler.get(searchTag)

export default handler