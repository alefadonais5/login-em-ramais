
CREATE DATABASE ramais_db;
USE ramais_db;

CREATE TABLE IF NOT EXISTS extensions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    extension_number SMALLINT NOT NULL UNIQUE,
    logged_user VARCHAR(255) DEFAULT NULL,
    in_use BOOLEAN DEFAULT FALSE
);

INSERT INTO extensions (extension_number, logged_user, in_use) VALUES
(100, NULL, FALSE),
(101, NULL, FALSE),
(102, NULL, FALSE),
(103, NULL, FALSE),
(104, NULL, FALSE),
(105, NULL, FALSE),
(106, NULL, FALSE),
(107, NULL, FALSE),
(108, NULL, FALSE),
(109, NULL, FALSE),
(110, NULL, FALSE);

SELECT * FROM extensions WHERE in_use = false;
