CREATE SCHEMA input;

DROP TABLE IF EXISTS input.train_positions;

CREATE TABLE input.train_positions
(
	timestamp TIMESTAMP WITHOUT TIME ZONE,
	linia VARCHAR(10),
	trip_id VARCHAR(255),
    latitude  NUMERIC(36,8),
    longitude NUMERIC(36,8)
)
;