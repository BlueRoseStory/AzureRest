const shared = require('../shared');

const contents =
    shared.dbClient.database(shared.cosmos_database)
        .container(shared.cosmos_container_contents);

module.exports = async function (context, req, item) {
    context.res = await shared.putHandler(context, req, item, contents);
}