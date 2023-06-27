-- Active: 1687865300366@@127.0.0.1@3306

CREATE TABLE
    IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
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

-- Retorna todos os usuários cadastrados

SELECT * FROM users;

-- Retorna todos os produtros cadastrados

SELECT * FROM products;

-- Retorda todos os produtos que atendam a um nome especifico

SELECT * FROM products WHERE name LIKE "%gamer%";

-- Incluir um novo usuário

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        create_at
    )
VALUES (
        "u004",
        "Beatriz",
        "bia.beatriz@hotmail.com",
        "pas004",
        "2021-11-15"
    );

-- Incluir um novo produto

INSERT INTO
    products (
        id,
        name,
        description,
        price,
        image_url
    )
VALUES (
        "prod006",
        "Apple iPhone 14 Pro Max 128GB Roxo-profundo 6,7” 48MP",
        "iPhone 14 Pro Max. Câmera grande-angular de 48 MP para capturar detalhes impressionantes. Dynamic Island, uma nova forma de interação no iPhone. Tela Sempre Ativa. E Detecção de Acidente*, um novo recurso de segurança que liga para a emergência se você não puder. Avisos legais *O SOS de Emergência usa uma conexão de rede celular ou chamadas Wi-Fi. **A tela tem bordas arredondadas. Quando medida como um retângulo, a tela tem 6,69 polegadas na diagonal. A área real de visualização é menor. ***A duração da bateria varia de acordo com o uso e a configuração. Consulte apple.com/br/batteries para obter mais informações. ****É preciso ter um plano de dados. 5G só está disponível em alguns países e por meio de determinadas operadoras. As velocidades variam de acordo com as condições e operadoras locais. Para obter detalhes sobre a compatibilidade com 5G, entre em contato com sua operadora e consulte apple.com/br/iphone/cellular. *****O iPhone 14 Pro Max é resistente a respingos, água e poeira e foi testado em condições controladas em laboratório, classificado como IP68 segundo a norma IEC 60529 (profundidade máxima de seis metros por até 30 minutos). A resistência a respingos, água e poeira não é uma condição permanente e pode diminuir com o tempo. Não tente recarregar um iPhone molhado. Veja instruções de limpeza e secagem no Manual do Usuário. Danos decorrentes de contato com líquidos não estão incluídos na garantia. ******Alguns recursos podem não estar disponíveis em todos os países ou regiões.",
        7998.99,
        "https://a-static.mlcdn.com.br/800x560/apple-iphone-14-pro-max-128gb-roxo-profundo-67-48mp/magazineluiza/235925100/954bf7dec1cbbd5eafee5ce7b3fdf7f8.jpg"
    );

-- Deletar um usuario por id

DELETE FROM users WHERE id = 'u004';

-- Deletar um produto com base em seu id

DELETE FROM products WHERE id = "prod006";

-- Editar um produto

UPDATE products
SET
    id = "prod007",
    name = "Apple Iphone 14 Pro Max 512GB Roxo-profundo 6,7”",
    description = "Uma nova forma de interação no seu iPhone. Um recurso essencial de segurança projetado para salvar vidas. Câmera grande-angular inovadora de 48 MP. Tela duas vezes mais brilhante sob a luz do sol◊Consultar avisos legais. Tudo com a potência do chip para smartphone que é o máximo.",
    price = 10799.10,
    image_url = "https://a-static.mlcdn.com.br/800x560/apple-iphone-14-pro-max-128gb-roxo-profundo-67-48mp/magazineluiza/235925100/954bf7dec1cbbd5eafee5ce7b3fdf7f8.jpg"
WHERE id = "prod006";

CREATE TABLE
    IF NOT EXISTS purchases (
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        "pur001",
        "u004",
        560.00,
        "2021-03-13"
    ), (
        "pur002",
        "u001",
        738.00,
        "2019-05-28"
    ), (
        "pur003",
        "u002",
        53.90,
        "2023-01-19"
    ), (
        "pur004",
        "u003",
        1639.19,
        "2020-12-23"
    );

SELECT * FROM purchases;

UPDATE purchases SET total_price = 549.86 WHERE id = "pur003";

SELECT
    purchases.id as "ID compra",
    users.id as "ID comprador",
    users.name as "Nome comprador",
    users.email as "Email",
    purchases.total_price,
    purchases.created_at
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id;