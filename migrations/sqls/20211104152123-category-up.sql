CREATE TABLE category(
    id      SERIAL      PRIMARY KEY,
    name    TEXT        NOT NULL UNIQUE
    );

CREATE TABLE producer(
    id      SERIAL      PRIMARY KEY,
    name    TEXT        NOT NULL UNIQUE
);
