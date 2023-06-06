CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE INDEX name_unique_index (name ASC)
) DEFAULT CHARACTER SET=utf8 ENGINE=InnoDB COMMENT = 'user information';

CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    comment VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    FOREIGN KEY (commenter)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX commenter_index (commenter ASC)
) DEFAULT CHARACTER SET=utf8 ENGINE=InnoDB COMMENT = "user comments";

INSERT INTO users (name, age, married, comment) VALUES ('harry', 24, 0, 'Hello from harry');

INSERT INTO users (name, age, married, comment) VALUES ('kane', 33, 1, 'Hello from kane');

INSERT INTO comments (commenter, comment) VALUES (1, 'This is harry''s comment');
