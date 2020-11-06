import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const query = `
query tags($start: string, $stop: string){
    tags(func: has(tag_name)) 
         @filter(ge(tag_name, $start) AND le(tag_name, $stop)) {
        uid
        tag_name
    }
}`

const searchTag = async (req, res) => {
    console.log(req.query)
    const hasQuery = !(Object.keys(req.query).length === 0);
    const { search } = hasQuery ? req.query : { search: "" }

    const vars = { $start: search, $stop: `${search}z` }
    const client = req.dbClient
    const txn = client.newTxn()
    const result = await txn.queryWithVars(query, vars)
    console.log(result.data);
    const { tags } = result.data
    res.json(tags)
}

handler.get(searchTag)

export default handler