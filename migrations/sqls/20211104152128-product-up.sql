CREATE TABLE products (
    id              SERIAL  PRIMARY KEY,
    name            TEXT    NOT NULL UNIQUE,
    category_id     INT     NOT NULL,
    quantity        INT     NOT NULL,
    price           INT     NOT NULL,
    description     TEXT    NOT NULL,
    producer_id     INT     NOT NULL,
    image_url       TEXT    NOT NULL,
    isDeleted       INT     NOT NULL DEFAULT 0,
    
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (producer_id) REFERENCES producer(id)
);


    