const ownerKey = 'sysdoc-owner-id';
const cosmos_database = 'sysdoc';
const cosmos_container_books = 'books';
const cosmos_container_chapters = 'chapters';
const cosmos_container_contents = 'contents';

const cosmos = require('@azure/cosmos');
const cosmosConnect = process.env.CosmosConnectionString;
const { CosmosClient } = cosmos;

const dbClient = new CosmosClient(cosmosConnect);

const postHandler = async function (context, req, container) {

    let res = { body: "unknown", status: 400 };

    if (req.body) {
        if (req.headers[ownerKey]) {
            let item = req.body;
            item.id = undefined;
            item.ownerId = req.headers[ownerKey];

            const response = await container.items.create(item);

            res.body = response.resource;
            res.status = 201;
        } else {
            res.body = ownerKey + ' header not found';
        }
    } else {
        res.body = 'request body not found';
    }

    return res;
};

const putHandler = async function(context, req, item, container) {

    let res = { body: 'unknown', status: 404 }

    if (req.headers[ownerKey]) {
        if (item) {

            let newItem = {};
            Object.assign(newItem, item, req.body);

            const { resource: updatedItem } = await container
                .item(item.id, req.headers[ownerKey])
                .replace(newItem);

            res.body = updatedItem;
            res.status = 200;
        } else {
            res.body = `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[ownerKey]}`;
        }
    } else {
        res.body = ownerKey + ' header not found';
    }

    return res;
}

const getHandler = async function(context, req, item) {
 
    let res =
    {
        status: 400,
        body: {
            status: "fail",
            data: { "message": "unknown" }
        }
    };

    if (item) {
        res.status = 200;
        res.body.status = "success";
        res.body.data = item;
    } else {
        res.status = 404;
        res.body.data = {
            "message": `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[ownerKey]}`
        };
    }
    
    return res;
}

const deleteHandler = async function(context, req, item, container) {

    let res =
    {
        status: 400,
        body: {
            status: "fail",
            data: { "message": "unknown" }
        }
    };

    if (item) {
        await container
            .item(item.id, req.headers[ownerKey])
            .delete();

        res.status = 200;
        res.body.status = "success";
        res.body.data = {
            "message": `Item: ${context.bindingData.itemId} deleted`
        };
    } else {
        res.status = 404;
        res.body.data = {
            "message": `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[ownerKey]}`
        };
    }

    return res;
}

module.exports = {
    ownerKey: 'sysdoc-owner-id',
    cosmos_database: cosmos_database,
    cosmos_container_books: cosmos_container_books,
    cosmos_container_chapters: cosmos_container_chapters,
    cosmos_container_contents: cosmos_container_contents,
    dbClient: dbClient,
    postHandler: postHandler,
    putHandler: putHandler,
    getHandler: getHandler,
    deleteHandler: deleteHandler
}
