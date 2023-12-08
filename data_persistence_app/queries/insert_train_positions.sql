INSERT INTO input.train_positions 
(
    timestamp,
    linia, 
    trip_id, 
    dir,
    en_hora,
    latitude, 
    longitude
)
VALUES (%s, %s, %s, %s, %s, %s, %s);
