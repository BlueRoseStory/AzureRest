module.exports = async function (context, documents) {
    
    if (!!documents && documents.length > 0) {
//        context.log('Document: ', JSON.stringify(documents[0]));
  
        context.bindings.item = documents[0];
        context.bindings.item.partitionKey = context.bindings.item.id;
        context.bindings.item.rowKey = context.bindings.item._ts;
    }
}
