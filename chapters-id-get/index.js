const shared = require('../shared');

module.exports = async function (context, req, item) {

    let res = { body: 'unknown', status: 404 }

    if (req.headers[shared.ownerKey]) {
        if (item) {
            res.body = item;
            res.status = 200;
        } else {
            res.body = `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[shared.ownerKey]}`;
        }
    } else {
        res.body = shared.ownerKey + ' header not found';
    }

    context.res = res;
}