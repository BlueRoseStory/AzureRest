const shared = require('../shared');
const cosmos = require('@azure/cosmos');
const cosmosConnect = process.env.CosmosConnectionString;
const { CosmosClient } = cosmos;

const client = new CosmosClient(cosmosConnect);

const books =
    client.database(shared.cosmos_database)
        .container(shared.cosmos_container_books);

module.exports = async function (context, req) {

    let res = { body: "unknown", status: 400 };

    if (req.body) {
        if (req.headers[shared.ownerKey]) {
            let item = req.body;
            item.id = undefined;
            item.ownerId = req.headers[shared.ownerKey];

            const response = await books.items.create(item);

            res.body = response.resource;
            res.status = 201;
        } else {
            res.body = shared.ownerKey + ' header not found';
        }
    } else {
        res.body = 'request body not found';
    }
    context.res = res;
}