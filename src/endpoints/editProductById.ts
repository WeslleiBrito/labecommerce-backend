import { Request, Response } from 'express'
import { db } from '../database/knex'
import { TProducts } from '../types'

export const editProductById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const { newId, name, price, description, imageUrl } = req.body


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


        if (newId) {

            if (typeof (newId) !== "string") {
                res.status(404)
                throw new Error(`O 'newId' precisa ser do tipo texto.`)
            }

            if (!regexId.test(newId)) {
                res.status(400)
                throw new Error(`O novo 'id' deve seguir o seguinte padrão: 'prod001', 'prod003', 'prod023', 'prod674'.`)
            }

            const [newIdExist] = await db('products').where({ id: newId })

            if (newIdExist) {
                res.status(400)
                throw new Error(`O novo 'id' informado já existe.`)
            }
        }


        const [productDb] = await db('products').where({ id })

        if (productDb) {

            const productEdited: TProducts = {
                id: newId || productDb.id,
                name: name || productDb.name,
                price: price || productDb.price,
                description: description || productDb.description,
                image_url: imageUrl || productDb.image_url
            }

            db('products').update(productEdited).where({ id }).then(() => {
                res.status(201).json({
                    message: "Produto atualizado com sucesso"
                })
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
}