import { TUsers, TProducts, TCreateUser } from "./types";

export const users: TUsers[] = [
    {
        id: "u001",
        name: 'Fulano',
        email: 'fulano@email.com',
        password: "fulano123",
        createdAt: `${new Date().toISOString()}`
    },

    {
        id: "u002",
        name: 'Beltrana',
        email: 'beltrana@email.com',
        password: "beltrana123",
        createdAt: `${new Date().toISOString()}`
    }
]


export const products: TProducts[] = [
    {
        id: "prod001",
        name: "Mouse Gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },

    {
        id: "prod002",
        name: "Monitor",
        price: 250,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]


export const createUser = ({ name, email, password }: TCreateUser): void => {
    const newId = String(Number(users[users.length - 1].id.slice(1)) + 1).padStart(3, "0")
    users.push({
        id: `u${newId}`,
        name: name,
        email: email,
        password: password,
        createdAt: `${new Date().toISOString()}`
    })

    console.log("Cadastro realizado com sucesso!")

}

export const getAllUsers = (): void => {
    console.table(users)
}