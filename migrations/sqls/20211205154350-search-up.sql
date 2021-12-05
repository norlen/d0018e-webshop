-- Adds column for full-text search.
-- See documentation: https://www.postgresql.org/docs/current/textsearch.html
ALTER TABLE products
    ADD COLUMN document_tokens TSVECTOR NOT NULL
        GENERATED ALWAYS AS (to_tsvector('swedish', coalesce("name", '') || ' ' || coalesce("description", ''))) STORED;

CREATE INDEX textsearch_idx ON products USING GIN (document_tokens);
