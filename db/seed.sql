CREATE TABLE wr10users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

SELECT * FROM wr10users
WHERE username = $1;

INSERT INTO wr10users (username, password)
VALUES ($1, $2)
returning *;