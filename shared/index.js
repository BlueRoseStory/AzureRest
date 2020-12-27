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

    let res = defaultResponse();

    if (req.body) {
        if (req.headers[ownerKey]) {
            let item = req.body;
            item.id = undefined;
            item.ownerId = req.headers[ownerKey];

            const response = await container.items.create(item);

            res.status = 201;
            res.body.status = "success";
            res.body.data = response.resource;
        } else {
            res.body.data = {
                "message": ownerKey + ' header not found'
            };
        }
    } else {
        res.body.data = {
            "message": 'request body not found'
        };
    }

    return res;
};

const putHandler = async function (context, req, item, container) {

    let res = defaultResponse();

    if (item) {
        let newItem = {};
        Object.assign(newItem, item, req.body);

        const { resource: updatedItem } = await container
            .item(item.id, req.headers[ownerKey])
            .replace(newItem);

        res.status = 200;
        res.body.status = "success";
        res.body.data = updatedItem;


    } else {
        res.body.data = {
            "message": `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[ownerKey]}`
        };
    }

    return res;
}

const deleteHandler = async function (context, req, item, container) {

    let res = defaultResponse();

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

const getItemHandler = async function (context, req, item) {

    let res = defaultResponse();

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

const getAllHandler = async function (context, req, container) {

    let res = defaultResponse();

    if (req.headers[ownerKey]) {

        const feedOptions = { partitionKey: req.headers[ownerKey] };

        const { resources: itemArray } =
            await container.items.readAll(feedOptions).fetchAll();

        if (itemArray) {
            res.status = 200;
            res.body.status = "success";
            res.body.count = itemArray.length;
            res.body.data = itemArray;
        }
    } else {
        res.body.data = {
            "message": ownerKey + ' header not found'
        };
    }

    return res;
};

const defaultResponse = function() {
    let res =
    {
        status: 400,
        body: {
            status: "fail",
            data: { "message": "unknown" }
        }
    };
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
    deleteHandler: deleteHandler,
    getItemHandler: getItemHandler,
    getAllHandler: getAllHandler
}
