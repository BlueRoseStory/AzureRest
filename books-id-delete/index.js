const shared = require('../shared');

const books =
    shared.dbClient.database(shared.cosmos_database)
        .container(shared.cosmos_container_books);

module.exports = async function (context, req, item) {
    context.res = await shared.deleteHandler(context, req, item, books);
}