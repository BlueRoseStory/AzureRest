const shared = require('../shared');

module.exports = async function (context, req, history) {
    context.res = await shared.getHistoryHandler(context, req, history);
}
