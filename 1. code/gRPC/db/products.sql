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

INSERT INTO products VALUES
    ('expensive', 1000, 'product', 'expensive', (0.01 , 10));
INSERT INTO products VALUES
    ('cheap', 800, 'another product', 'cheap', (0.01, 8));
INSERT INTO products VALUES
    ('no-discount', 1000000, 'expensive product without', 'discount', (0.00, 0));
