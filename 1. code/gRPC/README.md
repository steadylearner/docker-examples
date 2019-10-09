# How to test it

1. Set development data with **products.sql, users.sql and birthdaySQL.js** in **db** folder and .env for postgresql user and database.

2. **$yarn && yarn serve** in **user_product** and **yarn test-tape** in another console.

3. Repeat the same process from **2.** in **products** folder while other consoles from **2.** are not closed. It will also work without them.
