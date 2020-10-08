import * as dgraph from 'dgraph-js-http'
import nextConnect from 'next-connect';


const clientStub = new dgraph.DgraphClientStub(process.env.DGRAPH_URL)
const dgraphClient = new dgraph.DgraphClient(clientStub)

async function database(req, res, next) {
    req.dbClient = dgraphClient;
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;