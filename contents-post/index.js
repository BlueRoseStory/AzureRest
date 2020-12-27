const shared = require('../shared');

const contents =
    shared.dbClient.database(shared.cosmos_database)
        .container(shared.cosmos_container_contents);

module.exports = async function (context, req) {
    context.res = await shared.postHandler(context, req, contents);
}