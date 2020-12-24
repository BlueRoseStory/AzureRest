const shared = require('../shared');
const cosmos = require('@azure/cosmos');
const cosmosConnect = process.env.CosmosConnectionString;
const { CosmosClient } = cosmos;

const client = new CosmosClient(cosmosConnect);

const chapters =
    client.database(shared.cosmos_database)
        .container(shared.cosmos_container_chapters);

module.exports = async function (context, req) {

    let res = { body: "unknown", status: 400 };

    if (req.headers[shared.ownerKey]) {

        const feedOptions = { partitionKey: req.headers[shared.ownerKey] };

        const { resources: itemArray } = await chapters.items.readAll(feedOptions).fetchAll();

        if (itemArray) {
            context.log(`Returned ${itemArray.length} items`);
            res.body = itemArray;
            res.status = 200;
        }
    } else {
        res.body = shared.ownerKey + ' header not found';
    }

    context.res = res;
}