const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {

    let res = {
        body: "unknown",
        status: 400
    };

    if (req.body) {
        if (req.headers.sysdoc_ownerid) {
            let item = req.body;

            item.ownerId = req.headers.sysdoc_ownerid;
            item.id = uuidv4();

            res.body = JSON.stringify(item);
            res.status = 200;

            context.bindings.item = res.body;

        } else {
            res.body = 'sysdoc_ownerid header not found';
        }
    } else {
        res.body = 'request body not found';
    }
    context.res = res;
}
