module.exports = async function (context, req, contentItem) {

    let res = {
        body: `aItem: ${context.bindingData.contentId} not found for owner: ${context.bindingData.headers.ownerid}`,
        status: 404
    }
    // context.log('context: ' + JSON.stringify(context));

    if (contentItem) {
        res.body = contentItem;
        res.status = 200;
    } 

    context.res = res;
}