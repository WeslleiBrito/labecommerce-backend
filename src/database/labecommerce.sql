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

CREATE TABLE
    IF NOT EXISTS products (
        id TEXT NOT NULL PRIMARY KEY UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "prod001",
        "Monitor Gamer LG 22mp410-b 21,5 Full Hd 75hz 5ms Hdmi Va Freesync",
        525.00,
        "O Monitor LG acentua ainda mais desempenho dos visores de cristal líquido. A tela de 21,5 polegadas com resolução Full HD (1920X1080) proporciona imagens nítidas e precisas com incrível precisão cromática.",
        "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/168726789335879521?5480904579"
    ), (
        "prod002",
        "Console Ps5 (leitor De Disco) + 2 Controles - Sony",
        4599.00,
        "O Console PS5 (Leitor de disco) + 2 controles - Sony é o novo console da Sony, com CPU AMD Zen 2, de 3,5 GHz, e o SSD personalizado de 825 GB, que proporciona carregamento praticamente instantâneo dos jogos do PS5 instalados e segundo a Sony, é o videogame mais rápido do mundo, ainda acompanha 2 controles, um na cor branca e outro na cor purple.
Desfrute do carregamento extremamente rápido com o SSD de altíssima velocidade, uma imersão mais profunda com suporte a feedback tátil, gatilhos adaptáveis e áudio 3D, além de uma geração inédita de jogos incríveis para PlayStation 5.",
        "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/168726789335879521?18422904523"
    ), (
        "prod003",
        "Kit Processador I5 3470 + Placa H61 1155 + 8gb Ddr3 1600mhz",
        553.99,
        "Na Pc Xpress você encontra os mais variados modelos de Kit Upgrade e se preferir pode contar com nosso excelente atendimento para montar de acordo com sua necessidade, Aqui vc encontra todas as peças que precisa para fazer aquele Upgrade que sempre sonhou com um ótimo custo/benefício.
Venha conferir!",
        "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/168726789335879521?12581351324"
    ), (
        "prod004",
        'Apple iPad (9ª geração) 10.2" Wi-Fi 64GB - Cinza-espacial',
        2197.00,
        "Cheio de potência. Fácil de usar. Versátil. O novo iPad vem com a espetacular tela Liquid Retina de 10,2 polegadas, o poderoso chip A13 Bionic, uma câmera frontal ultra-angular com Palco Central e é compatível com o Apple Pencil e o Smart Keyboard (1). Você faz mais de um jeito mais fácil com o iPad. Tudo isso por menos do que você imagina.",
        "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/168726789335879521?5932553596"
    ), (
        "prod005",
        "Fone de ouvido over-ear gamer Fortrek G Pro H2 preto com luz azul LED",
        65.40,
        "Experimente a adrenalina de mergulhar na cena de outra maneira! Ter fones de ouvido específicos para jogos muda completamente sua experiência. Com os Fortrek H2, você não perde nenhum detalhe e ouve o áudio como ele foi pensado pelos criadores.",
        "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/168726789335879521?48493303994"
    );