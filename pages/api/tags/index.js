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
    // const { search } = req.query can't return empty string
    // So empty object is treated as truthy in javascript,
    // tenary operator doesn't work like below
    // const { search } = req.query ? req.query : { search: ""}
    const hasQuery = !(Object.keys(req.query).length === 0);
    const { search } = hasQuery ? req.query : { search: "" }

    const start = search
    const stop = hasQuery ? `${start}z` : ''
    const vars = { $start: start, $stop: stop }
    const client = req.dbClient
    const txn = client.newTxn()
    const result = await txn.queryWithVars(query, vars)
    const { tags } = result.data
    res.json(tags)
}

handler.get(searchTag)

export default handler