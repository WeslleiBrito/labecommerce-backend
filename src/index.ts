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
app.get('/products', async (req: Request, res: Response) => {

    try {
        const name = req.query.name

        if(typeof(name) !== "undefined"){

            if(name.length === 0){
                res.status(422)
                throw new Error("Informe o valor válido para o nome.")
            }

            const result = await db.raw(`SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%${name}%');`)

            res.status(200).send(result)

        }else{

            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }
        

    } catch (error: any) {
        res.status(400).send(error.message)
    }


})

//Criar um novo usuário 
app.post('/users', async (req: Request, res: Response) => {

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


        const idExist = await db.raw(`SELECT id FROM users WHERE id = "${id}";`)
        const emailExist = await db.raw(`SELECT email FROM users WHERE email = "${email}";`)


        if(idExist.length > 0){
            res.status(400)
            throw new Error("O id informado já encontra-se em nossa base de dados.")
        }

        if(emailExist.length > 0){
            res.status(400)
            throw new Error("O email informado já encontra-se em nossa base de dados.")
        }

        
        db.raw(`INSERT INTO users (id, name, email, password) VALUES("${id}", "${name}", "${email}", "${password}");`).then(() => {
            res.status(201).send(`${name}, seu cadastro foi realizado com sucesso!`)
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro, tente novamente. " + err)
        })


    } catch (error: any) {
        res.send(error.message)
    }


})

//Criar um novo produto
app.post('/products', async (req: Request, res: Response) => {

    try {

        const { id, name, price, description, imageUrl } = req.body

        Object.entries({id, name, description, imageUrl}).map((item) => {
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


        const idExist = await db.raw(`SELECT id FROM products WHERE id = "${id}";`)
        const nameExist = await db.raw(`SELECT name FROM products WHERE name = "${name}";`)

        if(idExist.length > 0){
            res.status(400)
            throw new Error(`O id '${id}', já consta em nossa base de dados.`)
        }

        if(nameExist.length > 0){
            res.status(400)
            throw new Error(`Já existe um produto com o nome '${name}' em nossa base de dados.`)
        }


        db.raw(`INSERT INTO products (id, name, price, description, image_url) VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}")`)
            .then(() => {
                res.status(201).send(`O produto ${name}, foi cadastrado com sucesso!`)
            }).catch((err) => {
                res.status(500)
                throw new Error("Tivemos um problema para finalizar seu cadastro do seu produto, tente novamente. " + err)
            })
   

    } catch (error: any) {
        res.send(error.message)
    }

})

// Criar uma nova compra 
app.post('/purchase',  async (req: Request, res: Response) => {

    try {
        const { id, buyer, totalPrice} = req.body

        Object.entries({id, buyer}).map((item: Array<string>) => {
            const [key, value] = item

            if(typeof(value) !== "string"){
                res.status(400)
                throw new Error(`A propriedade '${key}' deve ser do tipo 'string', porém o valor recebido foi do tipo '${typeof(value)}'.`)
            }
        })

        if(isNaN(totalPrice)){
            res.status(400)
            throw new Error(`A propriedade 'totalPrice' deve ser um valor numérico, porém o valor recebido foi '${typeof(totalPrice)}'.`)
        }

        const idExist = await db.raw(`SELECT id FROM purchases WHERE id = "${id}"`)

        if(idExist.length > 0){
            res.status(400)
            throw new Error(`O id '${id}' já consta em nossa base de dados.`)
        }

        db.raw(`INSERT INTO purchases (id, buyer, total_price) VALUES ("${id}", "${buyer}", ${totalPrice});`).then(() => {

            res.status(201).send("Compra cadastrada com sucesso")

        }).catch((err) => {

            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro da sua compra, tente novamente. " + err)
        })

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