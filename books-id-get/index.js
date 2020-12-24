module.exports = async function (context, req, item) {
    // context.log('context: ' + JSON.stringify(context));

    let res = {
        body: `Item: ${context.bindingData.itemId} not found for owner: ${context.bindingData.headers.ownerid}`,
        status: 404
    }

    if (item) {
        res.body = item;
        res.status = 200;
    } 

    context.res = res;
}