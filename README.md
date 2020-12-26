# AzureRest
Azure functions CRUD operations with Cosmos DB.  Table Storage is also used for tracking all changes.

## Postman Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19436892ea256135088f)

## Punch List

- [ ] Convert Response objects to follow JSend spec
- [ ] Add more tests to get an End-to-End test
- [ ] Video - Write script and record video
- [ ] README.MD  Add more explanation to this file
- [ ] Add Documentation (Swagger/Postman/?)

## Response Objects
We are trying to keep things simple by following this [JSend](https://github.com/omniti-labs/jsend) specification.   It appears to be a subset of the [json Api](https://jsonapi.org/) specification.  If we decide to add additional properties, we will use what is defined in the **json Api**.

This issue discussed in [this article](https://github.com/Azure/azure-webjobs-sdk/issues/1726) about the cosmos input trigger not being able to read headers is why we are not using bindings for the colleciton get (We can't get to our ownerid header)


Packages that I was using, but no longer need.
    "json-stringify-safe": "^5.0.1",
    "uuid": "^8.3.2"

Doc for Cosmos Javascript SDK
https://docs.microsoft.com/en-us/javascript/api/@azure/cosmos/items?view=azure-node-latest
