SELECT "timestamp"
	, linia
	, trip_id
	, latitude
	, longitude
FROM input.train_positions
WHERE "timestamp" > '{0}'
ORDER BY "timestamp" DESC
LIMIT 1000
;