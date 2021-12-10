-- Adds a created at column to the cart items,
-- so they always can be returned in the same order.
ALTER TABLE cart
    ADD COLUMN created_at TIMESTAMP DEFAULT now();
