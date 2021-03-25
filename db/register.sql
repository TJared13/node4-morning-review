INSERT INTO wr10users (username, password)
VALUES ($1, $2)
returning *;