CREATE DATABASE pastebin CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO exposures (id, type) VALUES
    (1, "Privado"),
    (2, "Publico");
