CREATE TABLE review (
    id          SERIAL      PRIMARY KEY,
    user_id     INT         NOT NULL,
    product_id  INT         NOT NULL,
    comment     TEXT        NOT NULL,
    grade       INT         NOT NULL CHECK (grade > -1 OR grade < 6),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
