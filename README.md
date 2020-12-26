# AzureRest
Azure functions CRUD operations with Cosmos DB.  Table Storage is also used for tracking all changes.

## Postman Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19436892ea256135088f)

(To view the documentation, [click here](https://documenter.getpostman.com/view/838809/TVsxARk3))

## Punch List

- [ ] Convert Response objects to follow JSend spec
- [ ] Add more tests to get an End-to-End test
- [ ] Video - Write script and record video
- [ ] README.MD  Add more explanation to this file
- [ ] Add Documentation (Swagger/Postman/?)
- [ ] Consider requiring a bearer token in header (The token could contain the ownerId)

## Response Objects
We are trying to keep things simple by following this [JSend](https://github.com/omniti-labs/jsend) specification.   It appears to be a subset of the [json Api](https://jsonapi.org/) specification.  If we decide to add additional properties, we will use what is defined in the **json Api**.

This issue discussed in [this article](https://github.com/Azure/azure-webjobs-sdk/issues/1726) about the cosmos input trigger not being able to read headers is why we are not using bindings for the colleciton get (We can't get to our ownerid header)


Packages that I was using, but no longer need.
    "json-stringify-safe": "^5.0.1",
    "uuid": "^8.3.2"

Doc for [Cosmos Javascript SDK](https://docs.microsoft.com/en-us/javascript/api/@azure/cosmos/items?view=azure-node-latest)

Link for examples from Youtube [POST/CON 2019 - Testing, Automation and Reporting Workshop](https://github.com/DannyDainton/post-con-2019-workshop) ([videos link](https://youtu.be/mZaayUAC-Hg))

More good examples for [Postman Tests](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/#parsing-response-body-data)

[JSON Editor Online](https://jsoneditoronline.org/) - Best tool I have found for quickly formatting JSON.

This doc [Azure Cosmos DB input binding for Azure Functions 2.x and higher](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=csharp) was helpful to get the bindings working.  Here is another link that [shows all the bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp)
