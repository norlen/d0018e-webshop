CREATE TABLE users(
    id          SERIAL      PRIMARY KEY,
    role        TEXT        CHECK ( role in ('administrator','customer') ) DEFAULT 'customer',
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL UNIQUE,
    password    TEXT        NOT NULL
);