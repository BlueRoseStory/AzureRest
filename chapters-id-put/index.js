const shared = require('../shared');

const chapters =
    shared.dbClient.database(shared.cosmos_database)
        .container(shared.cosmos_container_chapters);

module.exports = async function (context, req, item) {
    context.res = await shared.putHandler(context, req, item, chapters);
}