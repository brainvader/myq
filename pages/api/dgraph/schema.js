import * as dgraph from 'dgraph-js-http'
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

const getSchema = async (req, res) => {
    const client = req.dbClient
    const initialValue = ''
    const keys = Object.keys(schemaMap)
    const reducer = (res, key) => `${res} ${key} ${schemaMap[key]}. \n`
    const schema = keys.reduce(reducer, initialValue)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(schemaMap))
}

async function dropSchema() {
    await dgraphClient.alter({ dropAll: true });
}

async function setSchema(schema) {
    await dgraphClient.alter({ schema: schema })
}

handler.get(getSchema)

export default handler;