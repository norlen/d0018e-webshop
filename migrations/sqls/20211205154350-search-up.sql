-- Adds support for full text search on product name, category, producer and description.
-- See documentation: https://www.postgresql.org/docs/current/textsearch.html
--
-- This adds a column that holds the data required for the full text search, as well as triggers
-- that runs when data is inserted or updated.

-- Add column that holds the search vector.
ALTER TABLE products
    ADD COLUMN search_data TSVECTOR;

-- Create index over the column.
CREATE INDEX fts_search_idx ON products USING GIN (search_data);

-- Function to generate the search vector.
CREATE FUNCTION set_product_search_data()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    SELECT to_tsvector('swedish', coalesce(NEW.name, '') || ' ' || coalesce(p.name, '') || ' ' || coalesce(c.name, '') || ' ' || coalesce(NEW.description, ''))
    INTO NEW.search_data
    FROM producer AS p
      JOIN category AS c ON c.id = NEW.category_id
    WHERE
      p.id = NEW.producer_id;

    RETURN NEW;
END;
$BODY$;

-- Create trigger that updates the search data whenever the affected columns are updated.
CREATE TRIGGER search_value_update
    BEFORE UPDATE OF name, category_id, description, producer_id
    ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_product_full_text_search_vector();

-- Create trigger that updates the search data when a new product is inserted.
CREATE TRIGGER search_value_new_product
    BEFORE INSERT ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_product_full_text_search_vector();
