-- Active: 1687263910913@@127.0.0.1@3306

CREATE TABLE
    IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        create_at TEXT NOT NULL
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        create_at
    )
VALUES (
        "u001",
        "Antonia",
        "antonia@gmail.com",
        "pas001",
        "2020-03-15"
    ), (
        "u002",
        "Wesllei",
        "wesllei@gmail.com",
        "pas002",
        "2023-10-08"
    ), (
        "u003",
        "Pâmela",
        "pamela@gmail.com",
        "pas003",
        "2023-11-30"
    );