CREATE TABLE category (
    id      SERIAL      PRIMARY KEY,
    name    TEXT        NOT NULL UNIQUE
);

CREATE TABLE producer (
    id              SERIAL      PRIMARY KEY,
    name            TEXT        NOT NULL UNIQUE,
    image_url       TEXT        NOT NULL DEFAULT('/images/default-producer.jpg'),
    description     TEXT        NOT NULL DEFAULT('')
);
