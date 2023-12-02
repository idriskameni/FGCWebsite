SELECT COUNT(*)
	, train_id
FROM input.train_positions
WHERE linia = 'S1'
GROUP BY train_id
;

SELECT COUNT(*)
FROM input.train_positions
;

SELECT *
FROM input.train_positions
WHERE train_id = '625cdae602747611ba54c71940|7e2dc0e100'
LIMIT 100
;