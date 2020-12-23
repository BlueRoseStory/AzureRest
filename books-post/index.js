const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {

    let res = {
        body: "unknown",
        status: 400
    };

    if (req.body) {
        if (req.headers.sysdoc_ownerid) {
            let contentItem = req.body;

            contentItem.ownerId = req.headers.sysdoc_ownerid;
            contentItem.id = uuidv4();

            res.body = JSON.stringify(contentItem);
            res.status = 200;

            context.bindings.contentItem = res.body;

        } else {
            res.body = 'sysdoc_ownerid header not found';
        }
    } else {
        res.body = 'request body not found';
    }
    context.res = res;
}