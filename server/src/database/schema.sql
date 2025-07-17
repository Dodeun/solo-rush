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
);

-- Create Tier Lists
INSERT INTO tierlist (title) VALUES 
('80s Movies'),
('80s Songs'),
('80s Actors'),
('80s Video Games');

-- Insert List Items for "80s Movies"
INSERT INTO listitem (option_value, tierlist_id) VALUES
('Back to the Future', 1),
('The Empire Strikes Back', 1),
('Raiders of the Lost Ark', 1),
('The Shining', 1),
('Die Hard', 1),
('Ghostbusters', 1),
('E.T. the Extra-Terrestrial', 1),
('The Breakfast Club', 1);

-- Insert List Items for "80s Songs"
INSERT INTO listitem (option_value, tierlist_id) VALUES
('Billie Jean', 2),
('Sweet Child o'' Mine', 2),
('Take On Me', 2),
('Livin'' on a Prayer', 2),
('Every Breath You Take', 2),
('Wake Me Up Before You Go-Go', 2),
('Africa', 2),
('Girls Just Want to Have Fun', 2);

-- Insert List Items for "80s Actors"
INSERT INTO listitem (option_value, tierlist_id) VALUES
('Harrison Ford', 3),
('Michael J. Fox', 3),
('Tom Cruise', 3),
('Sigourney Weaver', 3),
('Eddie Murphy', 3),
('Arnold Schwarzenegger', 3),
('Molly Ringwald', 3);

-- Insert List Items for "80s Video Games"
INSERT INTO listitem (option_value, tierlist_id) VALUES
('Super Mario Bros.', 4),
('Legend of Zelda', 4),
('Pac-Man', 4),
('Tetris', 4),
('Donkey Kong', 4),
('Metroid', 4),
('Mega Man 2', 4),
('Contra', 4),
('Duck Hunt', 4),
('Double Dragon', 4);
