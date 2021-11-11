CREATE TABLE orders (
    id              SERIAL  PRIMARY KEY,
    user_id         INT     NOT NULL,
    order_status    INT     NOT NULL,
    name            TEXT    NOT NULL,
    phone_number    TEXT    NOT NULL,
    email           TEXT    NOT NULL,
    address         TEXT    NOT NULL,
    total_price     INT     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_products (
    order_id    INT     NOT NULL,
    product_id  INT     NOT NULL,
    price       INT     NOT NULL,
    quantity    INT     NOT NULL,

    PRIMARY KEY (order_id, product_id)
);
