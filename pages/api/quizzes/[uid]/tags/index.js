import nextConnect from 'next-connect';
import middleware from '../../../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const getTagsQuery = (uid) => {
    return `
    {
        tags(func: uid(${uid})) {
            tags {
                uid
                tag_name
            }
        }
    }`
}

const getTags = async (req, res) => {
    const { uid } = req.body
    const tagsQuery = getTagsQuery(uid)
    const result = await req.dbClient.newTxn().query(tagsQuery)
    const [tags] = result.data.tags
    res.json(tags)
}

handler.get(getTags)

export default handler