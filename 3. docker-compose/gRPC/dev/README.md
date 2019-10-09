# Commands

1. postgresql for data first

```sql
$docker exec -it grpc_postgresql psql -U postgres
ALTER USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE grpc;
\c grpc

CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth Date NOT NULL
);

ALTER USER postgres WITH PASSWORD 'postgres';
CREATE DOMAIN pct AS
  REAL NOT NULL CHECK (value >= 0);

CREATE DOMAIN value_in_cents AS
  INTEGER NOT NULL CHECK (value >= 0);

CREATE TYPE discount AS (
  pct pct,
  value_in_cents value_in_cents
);

CREATE TABLE products(
  id VARCHAR(255) PRIMARY KEY,
  price_in_cents INTEGER NOT NULL CHECK (price_in_cents > 0),
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  discount discount
);

INSERT INTO users VALUES
    ('steadylearner', 'steady', 'learner', '2019-01-01');
INSERT INTO users VALUES
    ('mybirthdayisblackfriday', 'mybirthdayis', 'blackfriday', '2019-11-25');
INSERT INTO users VALUES
    ('mybirthdayisnotblackfriday', 'mybirthdayis', 'notblackfriday', '2019-11-26');

INSERT INTO products VALUES
    ('expensive', 1000, 'product', 'expensive', (0.01 , 10));
INSERT INTO products VALUES
    ('cheap', 800, 'another product', 'cheap', (0.01, 8));
INSERT INTO products VALUES
    ('no-discount', 1000000, 'expensive product without', 'discount', (0.00, 0));
```

Your **gRPC.env** file should be **GRPC=postgres://postgres:postgres@grpc_postgresql:5432/grpc** and you can substitue it with your database from your localhost, aws rds etc.

2. Restart the containers because there wasn't data yet if you test it first in your local machine.

```console
$docker restart user_product
$docker restart products
```

3. Test them with curl

```console
// 1. Without Header
$curl localhost:80/product or localhost/product

// [Not Birthday]
// 2. With Header
$curl -H "X-USER-ID: steadylearner" localhost/product

// [Birthday]
// Make a user with random id first with SQL or ORM
$curl -H "X-USER-ID: 5c99c72a" localhost/product
```

You may stop the user_product to verify products /product end point work without it.(No discount and raw datas without modificaiton from databse)

```console
$docker stop user_product
```

and test the same Curl commands or

```console
$docker exec -it products bash
$yarn test-tape
```
