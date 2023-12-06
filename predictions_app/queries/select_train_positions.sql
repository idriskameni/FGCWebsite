SELECT "timestamp"
	, trip_id
	, dir
	, en_hora
	, latitude
	, longitude
FROM input.train_positions
WHERE linia = '{0}'
;