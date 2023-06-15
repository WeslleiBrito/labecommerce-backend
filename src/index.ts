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

    try {

        res.status(200).send(users)

    } catch (error) {
        res.status(500).send("Erro ao buscar os dados na base.")
    }

})

//Buscar todos os produtos ou um produto expecifico
app.get('/products/search', (req: Request, res: Response) => {

    try {
        const filter = req.query.filter

        if (typeof (filter) === "string") {

            if (filter.length === 0) {
                throw new Error("O valor do 'filter' deve possuir pelo menos 1 caracter")
            }

            res.send(
                products.filter((product) => {
                    return product.name.toLowerCase().includes(filter.toLowerCase())
                })
            )

        } else {
            res.status(200).send(products)
        }
    } catch (error: any) {
        res.status(400).send(error.message)
    }


})

//Criar um novo usuário 
app.post('/users', (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body

        const newUser = {
            id,
            name,
            email,
            password,
            createdAt: `${new Date().toISOString()}`
        }

        Object.entries(newUser).map((item) => {
            const [key, value] = item

            if (typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade "${key}" deve ser do tipo "string" e valor informado é do tipo "${typeof value}".`)
            }
        })

        if (!isNaN(name)) {
            res.status(400)
            throw new Error(`A propriedade "name" deve ser do tipo "string".`)
        }

        users.map((user) => {

            if (user.id === id) {
                res.status(400)
                throw new Error("O id informado já encontra-se em nossa base de dados.")
            } else if (user.email === email) {
                res.status(400)
                throw new Error("O email informado já encontra-se em nossa base de dados.")
            }
        })

        users.push(newUser)

        res.status(201).send(`${name}, seu cadastro foi realizado com sucesso!`)

    } catch (error: any) {
        res.send(error.message)
    }


})

//Criar um novo produto
app.post('/products', (req: Request, res: Response) => {

    try {
        const { id, name, price, description, imageUrl } = req.body

        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }

        Object.entries(newProduct).map((item) => {
            const [key, value] = item

            if (key !== "price" && typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade "${key}" deve ser do tipo "string" e valor informado é do tipo "${typeof value}".`)
            }
        })

        if (typeof (price) !== "number") {
            res.status(400)
            throw new Error(`A propriedade "price" deve ser do tipo "number".`)
        }

        products.map((product) => {

            if (product.id === id) {
                res.status(400)
                throw new Error("O id informado já encontra-se em nossa base de dados.")
            }
        })
        products.push(newProduct)

        res.status(201).send(`O produto ${name}, foi cadastrado com sucesso!`)

    } catch (error: any) {
        res.send(error.message)
    }

})

// Deletar um usuario
app.delete('/users/id', (req: Request, res: Response) => {
    const id = req.query.id

    res.send(typeof (id))

})

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})