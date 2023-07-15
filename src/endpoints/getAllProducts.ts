import { Request, Response } from 'express'
import { db } from '../database/knex'

export const getAllProducts = async (req: Request, res: Response) => {

    try {
        const name = req.query.name


        if (typeof (name) !== "undefined") {

            const result = await db('products').whereLike('name', `%${name}%`)

            res.status(200).send(result)

        } else {

            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        res.status(400).send(error.message)
    }


}