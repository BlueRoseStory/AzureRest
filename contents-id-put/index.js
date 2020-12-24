const shared = require('../shared');
const cosmos = require('@azure/cosmos');
const cosmosConnect = process.env.CosmosConnectionString;
const { CosmosClient } = cosmos;

const client = new CosmosClient(cosmosConnect);

const contents =
    client.database(shared.cosmos_database)
        .container(shared.cosmos_container_contents);

module.exports = async function (context, req, item) {

    let res = { body: 'unknown', status: 404 }

    if (req.headers[shared.ownerKey]) {
        if (item) {

            let newItem = {};
            Object.assign(newItem, item, req.body);

            const { resource: updatedItem } = await contents
                .item(item.id, req.headers[shared.ownerKey])
                .replace(newItem);

            res.body = updatedItem;
            res.status = 200;
        } else {
            res.body = `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[shared.ownerKey]}`;
        }
    } else {
        res.body = shared.ownerKey + ' header not found';
    }

    context.res = res;
}