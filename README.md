# AzureRest
Azure functions CRUD operations with Cosmos DB.  Table Storage is also used for tracking all changes.

## Response Objects
We are trying to keep things simple by following this [JSend](https://github.com/omniti-labs/jsend) specification.   It appears to be a subset of the [json Api](https://jsonapi.org/) specification.  If we decide to add additional properties, we will use what is defined in the **json Api**.

This issue discussed in [this article](https://github.com/Azure/azure-webjobs-sdk/issues/1726) about the cosmos input trigger not being able to read headers is why we are not using bindings for the colleciton get (We can't get to our ownerid header)


Packages that I was using, but no longer need.
    "json-stringify-safe": "^5.0.1",
    "uuid": "^8.3.2"

Doc for Cosmos Javascript SDK
https://docs.microsoft.com/en-us/javascript/api/@azure/cosmos/items?view=azure-node-latest