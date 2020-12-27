const shared = require('../shared');

module.exports = async function (context, req, item) {
    context.res = await shared.getHandler(context, req, item);
}