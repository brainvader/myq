import * as dgraph from 'dgraph-js-http'

const clientStub = new dgraph.DgraphClientStub(process.env.DGRAPH_URL)
const dgraphClient = new dgraph.DgraphClient(clientStub)

const schemaMap = {
    title: 'string',
    user: 'string',
    version: 'int',
    date: 'datetime',
    question: '[uid]',
    answer: '[uid]',
    tags: '[string]'
}

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const initialValue = ''
        const keys = Object.keys(schemaMap)
        const reducer = (res, key) => `${res} ${key} ${schemaMap[key]}. \n`
        const schema = keys.reduce(reducer, initialValue)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(schemaMap))
    }
}

async function dropSchema() {
    await dgraphClient.alter({ dropAll: true });
}

async function setSchema(schema) {
    await dgraphClient.alter({ schema: schema })
}

export default handler;