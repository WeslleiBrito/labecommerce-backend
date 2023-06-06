import express, { Request, Response } from 'express'
import { users, products } from './database'

import cors from 'cors'
import { TCreateUser, TProducts, TUsers } from './types'


const app = express()

app.use(express.json())

app.use(cors())


app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("Pong!")
})

//Buscar todos os usuários
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

//Buscar todos os produtos ou um produto expecifico
app.get('/products/search', (req: Request, res: Response) => {
    const filter = req.query.filter as string

    if (filter) {
        res.send(
            products.filter((product) => {
                return product.name.toLowerCase().includes(filter.toLowerCase())
            })
        )
    } else {
        res.status(200).send(products)
    }
})

//Criar um novo usuário 
app.post('/users', (req: Request, res: Response) => {

    const { id, name, email, password }: { id: string, name: string, email: string, password: string } = req.body

    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt: `${new Date().toISOString()}`
    }

    users.push(newUser)

    res.status(200).send(`${name}, seu cadastro foi realizado com sucesso!`)

})

//Criar um novo produto
app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl }: TProducts = req.body

    products.push(
        {
            id,
            name,
            price,
            description,
            imageUrl
        }
    )

    res.status(201).send(`O produto ${name}, foi cadastrado com sucesso!`)
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})