import { Request, Response } from 'express'
import { db } from '../database/knex'
import { TProducts } from '../types'

export const createProduct = async (req: Request, res: Response) => {

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

        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        db('products').insert(
            newProduct
        ).then(() => {
            res.status(201).json(
                {
                    message: "Produto cadastrado com sucesso"
                }
            )
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro do seu produto, tente novamente. " + err)
        })

    } catch (error: any) {
        res.send(error.message)
    }

}