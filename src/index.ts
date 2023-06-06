import express, { Request, Response } from 'express'
import { users, products } from './database'

import cors from 'cors'


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

//Buscar todos os produtos
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

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})