# SQL to use before you start the project

Start with postgresql SQL commands. You can refer to [this](https://www.postgresql.org/docs/9.6/rowtypes.html) for nested type definition.

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

DROP TABLE IF EXISTS users;
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
```
