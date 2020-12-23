module.exports = async function (context, req, item) {

    let res = {
        body: `Item: ${context.bindingData.itemId} not found for owner: ${context.bindingData.headers.ownerid}`,
        status: 404
    }
    // context.log('context: ' + JSON.stringify(context));

    if (item) {
        res.body = item;
        res.status = 200;
    } 

    context.res = res;
}