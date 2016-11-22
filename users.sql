DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;

\c blog;

CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  content VARCHAR
);

INSERT INTO posts (name, email, content)
  VALUES ('Tyler', 'tyler@demo.com', 'abcdefg');