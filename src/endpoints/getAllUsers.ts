import { Request, Response } from 'express'
import { db } from '../database/knex'

export const getAllUsers = async (req: Request, res: Response) => {

    try {

        const result = await db('users')

        res.status(200).send(result.map((item) => {
            const createdAt = item.created_at
            delete Object.assign(item, {['created_at']: item['createdAt'] })['createdAt']
            return {...item, createdAt}
        }))

    } catch (error) {
        res.status(500).send("Erro ao buscar os dados na base.")
    }

}