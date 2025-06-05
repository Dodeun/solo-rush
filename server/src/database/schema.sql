DROP DATABASE IF EXISTS neonrank;

CREATE DATABASE neonrank;

USE neonrank;

CREATE TABLE tierlist (
    tierlist_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40) DEFAULT 'Neon Ranks',
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listitem (
    listitem_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    option_value VARCHAR(40) NOT NULL,
    tierlist_id INT UNSIGNED,
    FOREIGN KEY (tierlist_id) REFERENCES tierlist(tierlist_id) ON DELETE CASCADE
)