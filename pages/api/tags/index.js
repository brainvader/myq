import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const allTagsQuery = `
    {
        all_tags(func: has(tag_name)) {
            uid
            tag_name
        }
    }`

const getAllTags = async (req, res) => {
    const result = await req.dbClient.newTxn().query(allTagsQuery)
    const all_tags = result.data.all_tags
    res.json(all_tags)
}

handler.get(getAllTags)

export default handler