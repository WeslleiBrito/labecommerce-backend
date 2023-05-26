
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

export type TProducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export const users: TUsers[] = [
    {
        id: "1",
        name: 'João',
        email: 'joao@example.com',
        password: 'senha1',
        createdAt: '2023-05-26 10:30:00:000'
    },
    {
        id: "2",
        name: 'Maria',
        email: 'maria@example.com',
        password: 'senha2',
        createdAt: '2023-05-26 11:45:20:500'
    },
    {
        id: "3",
        name: 'Pedro',
        email: 'pedro@example.com',
        password: 'senha3',
        createdAt: '2023-05-26 12:15:10:200'
    },
    {
        id: "4",
        name: 'Ana',
        email: 'ana@example.com',
        password: 'senha4',
        createdAt: '2023-05-26 13:20:05:700'
    },
    {
        id: "5",
        name: 'Lucas',
        email: 'lucas@example.com',
        password: 'senha5',
        createdAt: '2023-05-26 14:40:50:100'
    },
    {
        id: "6",
        name: 'Carolina',
        email: 'carolina@example.com',
        password: 'senha6',
        createdAt: '2023-05-26 15:10:30:900'
    },
    {
        id: "7",
        name: 'Rafael',
        email: 'rafael@example.com',
        password: 'senha7',
        createdAt: '2023-05-26 16:25:15:400'
    },
    {
        id: "8",
        name: 'Mariana',
        email: 'mariana@example.com',
        password: 'senha8',
        createdAt: '2023-05-26 17:55:40:600'
    },
    {
        id: "9",
        name: 'Fernanda',
        email: 'fernanda@example.com',
        password: 'senha9',
        createdAt: '2023-05-26 18:35:55:800'
    },
    {
        id: "10",
        name: 'Gustavo',
        email: 'gustavo@example.com',
        password: 'senha10',
        createdAt: '2023-05-26 19:10:25:300'
    },
    {
        id: "11",
        name: 'Beatriz',
        email: 'beatriz@example.com',
        password: 'senha11',
        createdAt: '2023-05-26 20:05:55:200'
    },
    {
        id: "12",
        name: 'Rodrigo',
        email: 'rodrigo@example.com',
        password: 'senha12',
        createdAt: '2023-05-26 21:15:10:700'
    },
    {
        id: "13",
        name: 'Juliana',
        email: 'juliana@example.com',
        password: 'senha13',
        createdAt: '2023-05-26 22:30:20:400'
    },
    {
        id: "14",
        name: 'Fábio',
        email: 'fabio@example.com',
        password: 'senha14',
        createdAt: '2023-05-26 23:45:40:600'
    },
    {
        id: "15",
        name: 'Isabela',
        email: 'isabela@example.com',
        password: 'senha15',
        createdAt: '2023-05-27 00:25:15:200'
    },
    {
        id: "16",
        name: 'Henrique',
        email: 'henrique@example.com',
        password: 'senha16',
        createdAt: '2023-05-27 01:10:30:100'
    },
    {
        id: "17",
        name: 'Laura',
        email: 'laura@example.com',
        password: 'senha17',
        createdAt: '2023-05-27 02:20:55:800'
    },
    {
        id: "18",
        name: 'Marcelo',
        email: 'marcelo@example.com',
        password: 'senha18',
        createdAt: '2023-05-27 03:35:20:500'
    },
    {
        id: "19",
        name: 'Camila',
        email: 'camila@example.com',
        password: 'senha19',
        createdAt: '2023-05-27 04:50:45:900'
    },
    {
        id: "20",
        name: 'Antônio',
        email: 'antonio@example.com',
        password: 'senha20',
        createdAt: '2023-05-27 05:15:55:300'
    }
]

export const products: TProducts[] = [
    {
        id: "1",
        name: 'Tinta Acrílica',
        price: 29.99,
        description: 'Tinta acrílica de alta qualidade para pintura interna e externa.',
        imageUrl: 'https://example.com/tinta-acrilica.jpg'
    },
    {
        id: "2",
        name: 'Cimento Portland',
        price: 19.99,
        description: 'Cimento Portland para construção e alvenaria.',
        imageUrl: 'https://example.com/cimento-portland.jpg'
    },
    {
        id: "3",
        name: 'Telha de Cerâmica',
        price: 9.99,
        description: 'Telha de cerâmica resistente para cobertura de telhados.',
        imageUrl: 'https://example.com/telha-ceramica.jpg'
    },
    {
        id: "4",
        name: 'Tijolo de Concreto',
        price: 1.99,
        description: 'Tijolo de concreto para construção de paredes e estruturas.',
        imageUrl: 'https://example.com/tijolo-concreto.jpg'
    },
    {
        id: "5",
        name: 'Argamassa',
        price: 12.99,
        description: 'Argamassa pronta para assentamento de azulejos e revestimentos.',
        imageUrl: 'https://example.com/argamassa.jpg'
    },
    {
        id: "6",
        name: 'Tinta Esmalte',
        price: 24.99,
        description: 'Tinta esmalte para acabamentos e pintura de metais.',
        imageUrl: 'https://example.com/tinta-esmalte.jpg'
    },
    {
        id: "7",
        name: 'Areia Lavada',
        price: 39.99,
        description: 'Areia lavada de alta qualidade para construção civil.',
        imageUrl: 'https://example.com/areia-lavada.jpg'
    },
    {
        id: "8",
        name: 'Cerâmica para Piso',
        price: 34.99,
        description: 'Cerâmica para piso de ambientes internos e externos.',
        imageUrl: 'https://example.com/ceramica-piso.jpg'
    },
    {
        id: "9",
        name: 'Tubos de PVC',
        price: 8.99,
        description: 'Tubos de PVC para condução de água e esgoto.',
        imageUrl: 'https://example.com/tubos-pvc.jpg'
    },
    {
        id: "10",
        name: 'Tinta Epóxi',
        price: 49.99,
        description: 'Tinta epóxi de alta resistência para pisos industriais.',
        imageUrl: 'https://example.com/tinta-epoxi.jpg'
    },
    {
        id: "11",
        name: 'Revestimento Cerâmico',
        price: 19.99,
        description: 'Revestimento cerâmico para paredes internas e externas.',
        imageUrl: 'https://example.com/revestimento-ceramico.jpg'
    },
    {
        id: "12",
        name: 'Cimento Cola',
        price: 14.99,
        description: 'Cimento cola para assentamento de pisos e revestimentos.',
        imageUrl: 'https://example.com/cimento-cola.jpg'
    },
    {
        id: "13",
        name: 'Tinta Spray',
        price: 9.99,
        description: 'Tinta spray multiuso para diversas aplicações.',
        imageUrl: 'https://example.com/tinta-spray.jpg'
    },
    {
        id: "14",
        name: 'Piso Vinílico',
        price: 39.99,
        description: 'Piso vinílico de fácil instalação e manutenção.',
        imageUrl: 'https://example.com/piso-vinilico.jpg'
    },
    {
        id: "15",
        name: 'Bloco de Concreto',
        price: 2.99,
        description: 'Bloco de concreto para construção de paredes e estruturas.',
        imageUrl: 'https://example.com/bloco-concreto.jpg'
    },
    {
        id: "16",
        name: 'Tinta Látex',
        price: 19.99,
        description: 'Tinta látex de acabamento fosco para paredes internas.',
        imageUrl: 'https://example.com/tinta-latex.jpg'
    },
    {
        id: "17",
        name: 'Grades de Ferro',
        price: 49.99,
        description: 'Grades de ferro para proteção e segurança de ambientes.',
        imageUrl: 'https://example.com/grades-ferro.jpg'
    },
    {
        id: "18",
        name: 'Impermeabilizante',
        price: 29.99,
        description: 'Impermeabilizante para proteção contra infiltrações.',
        imageUrl: 'https://example.com/impermeabilizante.jpg'
    },
    {
        id: "19",
        name: 'Tinta PVA',
        price: 14.99,
        description: 'Tinta PVA para pintura artística e manualidades.',
        imageUrl: 'https://example.com/tinta-pva.jpg'
    },
    {
        id: "20",
        name: 'Lixa para Madeira',
        price: 4.99,
        description: 'Lixa para madeira de diversos grãos e tamanhos.',
        imageUrl: 'https://example.com/lixa-madeira.jpg'
    }
];




