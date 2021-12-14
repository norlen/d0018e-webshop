ALTER TABLE products
ADD CONSTRAINT quantity_not_negative
CHECK (quantity >= 0);