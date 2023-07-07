
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

export type TCreateUser = {
    name: string,
    email: string,
    password: string
}

export type TCreateProduct = {
    name: string,
    value: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    products: Array<{
        id: string,
        quantity: number
    }>
}

