import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const schemaMap = {
    title: 'string',
    user: 'string',
    version: 'int',
    date: 'datetime',
    question: '[uid]',
    answer: '[uid]',
    tags: '[string]'
}

const toSchema = (schemaMap) => {
    const initialValue = ''
    const keys = Object.keys(schemaMap)
    const reducer = (res, key) => `${res} ${key}: ${schemaMap[key]} . \n`
    const schema = keys.reduce(reducer, initialValue)
    return schema
}

const getSchema = async (_, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(schemaMap))
}

const dropSchema = async (req, res) => {
    const response = await req.dbClient.alter({ dropAll: true });
    res.end(JSON.stringify(response.data))
}

const setSchema = async (req, res) => {
    const schema = toSchema(schemaMap)
    const response = await req.dbClient.alter({ schema: schema })
    res.end(JSON.stringify(response.data))
}

handler.get(getSchema)
handler.post(setSchema)
handler.delete(dropSchema)

export default handler;