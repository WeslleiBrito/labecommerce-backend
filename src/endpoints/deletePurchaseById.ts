import { Request, Response } from 'express'
import { db } from '../database/knex'

export const deletePurchaseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const regexIdPurchase = /^pur\d{3}$/

        if(!regexIdPurchase.test(id)){
            res.status(400)
            throw new Error(`O id informado é inválido.`)
        }

        const [purchaseExist] = await db('purchases').where({id})

        if(purchaseExist){
            db('purchases').del().where({id}).then(() => {
                res.status(200).json(
                    {
                        message: "Pedido cancelado com sucesso"
                    }
                )
            })
        }else{
            res.status(400)
            throw new Error(`A compra informada não existe. Tente novamente.`)
        }
    } catch (error: any) {
        res.json({ error: error.message })
    }
}