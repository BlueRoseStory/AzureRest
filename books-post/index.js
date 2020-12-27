const shared = require('../shared');

const books =
    shared.dbClient.database(shared.cosmos_database)
        .container(shared.cosmos_container_books);

module.exports = async function (context, req) {
    context.res = await shared.postHandler(context, req, books);
}