# How to test it with postgresql and .env 

1. Set development environment products.sql, users.sql and birthdaySQL.js in db folder and .env

2. **$yarn && yarn serve** in user_product and **yarn test-tape** in another console

3. products folder will work without user_product also but because it uses data from it. Do the same processes in **2.** while other consoles from **2.** are not closed.
