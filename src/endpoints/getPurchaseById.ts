import { Request, Response } from 'express'
import { db } from '../database/knex'

export const getPurchaseById = async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        //Busca todas as compras unindo com os dados do usuário

        const purchases = await db('purchases').select(
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

        const [purchase] = purchases.filter((purchase) => {
            return purchase.purchaseId === id
        })

        // Faz a união dos dados dos produtos com as compras feitas
        const products = await db('purchases_products').select(
            'products.id',
            'products.name',
            'products.price',
            'products.description',
            'products.image_url AS imageUrl',
            'purchases_products.quantity',
        ).innerJoin(
            'products',
            'products.id',
            '=',
            'purchases_products. product_id',
        ).where({ purchase_id: id })


        if (purchase) {

            purchase.products = products
            res.status(200).send(purchase)

        } else {
            res.status(400)
            throw new Error(`O id '${id}' não consta em nossa base de dados!`)
        }

    } catch (error: any) {
        res.send(error.message)
    }

}