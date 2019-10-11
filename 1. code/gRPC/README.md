# How to test it

1. Set development data with **products.sql, users.sql and birthdaySQL.js** in **db** folder and **.env** to use **postgresql** and its user and the database.

2. **$yarn** to install NPM pacakges in **products** and **user_product** folder. 

3. **$yarn serve** in **user_product** to start gRPC server and **$yarn test-tape** in another console to test user and product datas from the server.

4. **$yarn serve** in **products** to start gRPC server with express server to serve /product route in another console. Then, **$yarn test-tape** in another console while **user_product** gRPC server from **3.** are not closed.

## .env

It should be similar to this.

```console
GRPC=postgres://postgres:postgres@localhost/grpc
```
