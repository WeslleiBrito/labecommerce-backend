import express, { Request, Response } from 'express'
import { users, products } from './database'
import { db } from './database/knex'
import cors from 'cors'



const app = express()

app.use(express.json())

app.use(cors())


app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("Pong!")
})

//Buscar todos os usuários
app.get('/users', async (req: Request, res: Response) => {

    try {

        const result = await db.raw("SELECT * FROM users")

        res.status(200).send(result)

    } catch (error) {
        res.status(500).send("Erro ao buscar os dados na base.")
    }

})

//Buscar todos os produtos ou um produto expecifico
app.get('/products/search', async (req: Request, res: Response) => {

    try {
        const filter = req.query.filter

        if (typeof (filter) !== "string" || filter.length === 0) {
            res.status(422)
            throw new Error("Informe o valor válido para o filtro.")
        }

        res.status(200).send(
            await db.raw(`SELECT * FROM products WHERE LOWER(name) LIKE LOWER("%${filter}%");`)
        )

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
app.delete('/users/:id', (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const regexId = /^u\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'u001', 'u003', 'u023', 'u674'.`)
        }

        const indexUser = users.findIndex((user) => {
            return user.id === id
        })

        if (!indexUser) {
            users.splice(indexUser, 1)
            res.send("Usuário excluido com sucesso!")
        } else {
            throw new Error(`O id informado não encontra-se em nossa base de dados!`)
        }


    } catch (error: any) {
        res.send(error.message)
    }


})

// Deletar um produto

app.delete('/products/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const regexId = /^prod\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'prod001', 'prod003', 'prod023', 'prod674'.`)
        }

        const indexProduct = products.findIndex((product) => {
            return product.id === id
        })

        if (!indexProduct) {
            res.status(400)
            throw new Error(`O id informado não encontra-se em nosso banco de dados.`)
        }
        const name = products[indexProduct].name
        products.splice(indexProduct, 1)

        res.status(200).send(`O produto "${name}" foi excluido com sucesso!`)

    } catch (error: any) {
        res.send(error.message)
    }

})

// Editar um produto
app.put('/products/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const { name, price, description, imageUrl } = req.body


        const regexId = /^prod\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'prod001', 'prod003', 'prod023', 'prod674'.`)
        }

        const indexProduct = products.findIndex((product) => {
            return product.id === id
        })

        if (indexProduct < 0) {
            res.status(400)
            throw new Error(`O id informado não encontra-se em nosso banco de dados.`)
        }

        const currentItem = products[indexProduct]

        Object.entries({ name, description, imageUrl }).map((item) => {
            const [key, value] = item

            if (value && typeof (value) !== "string") {
                res.status(400)
                throw new Error(`O parametro "${key}" espera receber uma "string" e foi enviado um valor do tipo "${typeof value}".`)
            } else if (typeof (value) === "string" && value.length === 0) {
                res.status(400)
                throw new Error(`O parametro "${key}" não pode ser vazio".`)
            }
        })

        if (price && isNaN(Number(price))) {
            res.status(400)
            throw new Error(`O parametro "price" espera receber um "number" e foi enviado um valor do tipo "${typeof price}".`)
        }

        currentItem.name = name || currentItem.name
        currentItem.price = price || currentItem.price
        currentItem.description = description || currentItem.description
        currentItem.imageUrl = imageUrl || currentItem.imageUrl

        res.status(201).send(`Produto modificado com sucesso!`)

    } catch (error: any) {
        res.send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})