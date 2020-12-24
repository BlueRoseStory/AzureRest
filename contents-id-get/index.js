const ownerKey = 'sysdoc-owner-id'; 

module.exports = async function (context, req, item) {

    let res = {
        body: 'unknown',
        status: 404
    }

    if (req.headers[ownerKey]) {
        if (item) {
            res.body = item;
            res.status = 200;
        } else {
            res.body = `Item: ${context.bindingData.itemId} not found for owner: ${req.headers[ownerKey]}`;
        }
    } else {
        res.body = ownerKey + ' header not found';        
    }

    context.res = res;
}