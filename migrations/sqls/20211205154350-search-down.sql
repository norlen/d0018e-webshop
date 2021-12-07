DROP TRIGGER search_value_new_product ON products;
DROP TRIGGER search_value_update ON products;
DROP FUNCTION set_product_search_data();

DROP INDEX fts_search_idx;

ALTER TABLE products
    DROP COLUMN search_data;
