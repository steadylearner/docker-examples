# SQL to use before you start the project

Start with postgresql SQL commands. You can refer to [this](https://www.postgresql.org/docs/9.6/rowtypes.html) for nested type definition.
Search for [unique](https://www.google.com/search?q=postgresql+how+to+make+data+unique), [contraints](http://www.postgresqltutorial.com/postgresql-user-defined-data-types/) and [primary key and references](http://www.postgresqltutorial.com/postgresql-foreign-key/)

## 1. Define sql types

Paste the part before DROP part in your postgresql console.

```sql
CREATE DATABASE grpc OWNER you;
\c grpc

CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth Date NOT NULL
);

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

DROP TABLE IF EXISTS users, products;
DROP TYPE IF EXISTS discount;
DROP DOMAIN IF EXISTS pct, value_in_cents;
```

## 2. Give some test datas

Paste it in your postgresql console.

```sql
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
