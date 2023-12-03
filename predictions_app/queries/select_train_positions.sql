SELECT "timestamp"
	, linia
	, trip_id
	, latitude
	, longitude
FROM input.train_positions
WHERE "timestamp" > '{0}'
	AND "linia" = '{1}'
ORDER BY "timestamp" DESC
LIMIT 1000
;