import express, { Request, Response } from 'express'
import { db } from './database/knex'
import cors from 'cors'


const app = express()

app.use(express.json())

app.use(cors())


app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("Pong!")
})


//Criar um novo usuário 
app.post('/users', async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body

        const newUser = {
            id,
            name,
            email,
            password
        }

        Object.entries(newUser).map((item) => {
            const [key, value] = item

            if (typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade "${key}" deve ser do tipo "string" e valor informado é do tipo "${typeof value}".`)
            }
        })

        const [idExist] = await db('users').where({ id })
        const [emailExist] = await db('users').where({ email })

        if (idExist) {
            res.status(400)
            throw new Error("O id informado já encontra-se em nossa base de dados.")
        }

        if (emailExist) {
            res.status(400)
            throw new Error("O email informado já encontra-se em nossa base de dados.")
        }

        db('users').insert(newUser).then(() => {
            res.status(201).send(`${name}, seu cadastro foi realizado com sucesso!`)
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro, tente novamente. " + err)
        })


    } catch (error: any) {
        res.send(error.message)
    }


})

//Buscar todos os usuários
app.get('/users', async (req: Request, res: Response) => {

    try {

        const result = await db('users')

        res.status(200).send(result)

    } catch (error) {
        res.status(500).send("Erro ao buscar os dados na base.")
    }

})

//Criar um novo produto
app.post('/products', async (req: Request, res: Response) => {

    try {

        const { id, name, price, description, imageUrl } = req.body

        Object.entries({ id, name, description, imageUrl }).map((item) => {
            const [key, value] = item

            if (typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade "${key}" deve ser do tipo "string" e valor informado é do tipo "${typeof value}".`)
            }
        })


        if (typeof (price) !== "number") {
            res.status(400)
            throw new Error(`A propriedade "price" deve ser do tipo "number".`)
        }


        const [idExist] = await db('products').where({ id })
        const [nameExist] = await db('products').where({ name: name })

        if (idExist) {
            res.status(400)
            throw new Error(`O id '${id}', já consta em nossa base de dados.`)
        }

        if (nameExist) {
            res.status(400)
            throw new Error(`Já existe um produto com o nome '${name}' em nossa base de dados.`)
        }

        db('products').insert(
            {
                id,
                name,
                price,
                description,
                image_url: imageUrl
            }
        ).then(() => {
            res.status(201).send(`O produto ${name}, foi cadastrado com sucesso!`)
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro do seu produto, tente novamente. " + err)
        })

    } catch (error: any) {
        res.send(error.message)
    }

})

//Buscar produto pelo id
app.get('/products/:id', async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        if (id.length < 1) {
            res.status(400)
            throw new Error(`Informe o id do produto a ser localizado`)
        }

        const [result] = await db('products').where({ id })

        if (!result) {
            res.status(404)
            throw new Error(`O id '${id}' não consta em nossa base de dados.`)
        }

        res.status(200).send(result)

    } catch (error: any) {
        res.send(error.message)
    }

})

//Buscar todos os produtos ou um produto expecifico
app.get('/products', async (req: Request, res: Response) => {

    try {
        const name = req.query.name


        if (typeof (name) !== "undefined") {

            const result = await db('products').where('name', 'LIKE', `%${name}%`)

            res.status(200).send(result)

        } else {

            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        res.status(400).send(error.message)
    }


})

// Deletar um produto
app.delete('/products/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const regexId = /^prod\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'prod001', 'prod003', 'prod023', 'prod674'.`)
        }


        const [idExist] = await db('products').where({ id })

        if (idExist) {
            await db('products').del().where({ id }).then(() => {
                res.status(300).send(`O produto "${idExist.name}" foi excluido com sucesso!`)
            }).catch((err) => {
                res.status(500)
                throw new Error('Tivemos um problema para excluir o produto, tente novamente.' + err)
            })
        } else {
            res.status(400)
            throw new Error(`O id informado não encontra-se em nosso banco de dados.`)
        }

    } catch (error: any) {
        res.send(error.message)
    }

})

// Editar um produto
app.put('/products/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const { name, price, description, imageUrl } = req.body


        const regexId = /^prod\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'prod001', 'prod003', 'prod023', 'prod674'.`)
        }


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

        const [productDb] = await db('products').where({ id })

        if (productDb) {

            const productEdited = {
                name: name || productDb.name,
                price: price || productDb.price,
                description: description || productDb.description,
                image_url: imageUrl || productDb.image_url
            }

            db('products').update(productEdited).where({ id }).then(() => {
                res.status(201).send(`O Produto '${productEdited.name}' foi modificado com sucesso!`)
            }).catch((err) => {
                res.status(500)
                throw new Error(`Tivemos um problema para editar o produto. ` + err)
            })

        } else {
            res.status(400)
            throw new Error(`O id '${id}' não consta em nossa base de dados.`)
        }

    } catch (error: any) {
        res.send(error.message)
    }
})

// Criar uma nova compra 
app.post('/purchases', async (req: Request, res: Response) => {

    try {
        const { id, buyer, totalPrice } = req.body

        Object.entries({ id, buyer }).map((item: Array<string>) => {
            const [key, value] = item

            if (typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade '${key}' deve ser do tipo 'string', porém o valor recebido foi do tipo '${typeof (value)}'.`)
            }
        })

        if (isNaN(totalPrice)) {
            res.status(400)
            throw new Error(`A propriedade 'totalPrice' deve ser um valor numérico, porém o valor recebido foi '${typeof (totalPrice)}'.`)
        }

        const [idExist] = await db('purchases').where({ id })

        if (idExist) {
            res.status(400)
            throw new Error(`O id '${id}' já consta em nossa base de dados.`)
        }

        db('purchases').insert(
            {
                id,
                buyer,
                total_price: totalPrice
            }
        ).then(() => {
            res.status(201).send("Compra cadastrada com sucesso")
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar sua compra, tente novamente. " + err)
        })


    } catch (error: any) {
        res.send(error.message)
    }
})

// Buscar uma compra pelo id
app.get('/purchases/:id', async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        const result = await db('purchases').select(
            'purchases.id AS purchaseId',
            'users.id AS buyerId',
            'users.name AS buyerName',
            'users.email AS buyerEmail',
            'purchases.total_price AS totalPrice',
            'purchases.created_at AS createdAt'
        ).innerJoin(
            'users',
            'purchases.buyer',
            '=',
            'users.id'
        )

        const [filter] = result.filter((purchase) => {
            return purchase.purchaseId === id
        })

        if (filter) {
            res.status(200).send(filter)
        } else {
            res.status(400)
            throw new Error(`O id '${id}' não consta em nossa base de dados!`)
        }

    } catch (error: any) {
        res.send(error.message)
    }

})

// Deletar um usuario
app.delete('/users/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const regexId = /^u\d{3}$/

        if (!regexId.test(id)) {
            res.status(400)
            throw new Error(`Era esperado uma string seguindo o seguinte padrão: 'u001', 'u003', 'u023', 'u674'.`)
        }

        const [idExist] = await db('users').where({ id })

        if (idExist) {

            db('users').del().where({ id }).then(() => {
                res.status(300).send("Usuário excluido com sucesso!")
            })

        } else {
            res.status(400)
            throw new Error(`O id informado não encontra-se em nossa base de dados!`)
        }


    } catch (error: any) {
        res.send(error.message)
    }


})


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})