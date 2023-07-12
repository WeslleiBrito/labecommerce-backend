import { Request, Response } from 'express'
import { db } from '../database/knex'

export const createPurchase = async (req: Request, res: Response) => {

    try {

        const { id, buyer, products } = req.body
        const regexIdPurchase = /^pur\d{3}$/
        const regexIdBuyer = /^u\d{3}$/
        const listId: Array<string> = []
        const listQuantity: Array<number> = []

        Object.entries({ id, buyer }).map((item: Array<string>) => {
            const [key, value] = item

            if (typeof (value) !== "string") {
                res.status(400)
                throw new Error(`A propriedade '${key}' deve ser do tipo 'string', porém o valor recebido foi do tipo '${typeof (value)}'.`)
            }
        })

        if (!regexIdPurchase.test(id)) {
            res.status(400)
            throw new Error(`O 'id' da compra precisa possuir o seguinte padrão: ['pur001', 'pur023', 'pur100'].`)
        }

        if (!regexIdBuyer.test(buyer)) {
            res.status(400)
            throw new Error(`O id do comprador precisa possuir o seguinte padrão: ['u001', 'u023', 'u100'].`)
        }

        const [userExist] = await db('users').where({id: buyer})

        if(!userExist){
            res.status(400)
            throw new Error(`O usário informado não existe.`)
        }
        
        if (Array.isArray(products) && products.length > 0) {

            const regexIdProduct = /^prod\d{3}$/

            products.map( async (product, index) => {
                const errro = false

                if (product.id) {
                    if (typeof (product.id) !== "string") {
                        res.status(404)
                        throw new Error(`O 'id' deve ser do tipo texto. Verifique o produto na posição '${index}'.`)
                    }

                    if (product.id.length < 1) {
                        res.status(400)
                        throw new Error(`O 'id' não pode ser um valor vazio. Verifique o produto na posição '${index}'.`)
                    }

                    if (!regexIdProduct.test(product.id)) {
                        res.status(400)
                        throw new Error(`O 'id' precisa possuir o seguinte padrão: ['prod001', 'prod023', 'prod100']. Verifique o produto na posição '${index}'.`)
                    }

                } else {
                    res.status(400)
                    throw new Error(`A propriedade 'id' não existe no objeto 'product' na posição '${index}'.`)
                }


                if (product.quantity || product.quantity === 0) {

                    if (typeof (product.quantity) !== "number") {
                        res.status(400)
                        throw new Error(`A propriedade 'quantity' deve ser um valor numérico inteito. Verifique o produto na posição '${index}'.`)
                    }

                    if (product.quantity < 1) {
                        res.status(400)
                        throw new Error(`A propriedade 'quantity' deve ser maior que zero. Verifique o produto na posição '${index}'.`)
                    }

                } else {
                    res.status(400)
                    throw new Error(`A propriedade 'quantity' não existe no objeto 'product' na posição '${index}'.`)
                }
                listId.push(product.id)
                listQuantity.push(product.quantity)
            })


        } else {
            res.status(400)
            throw new Error("A propriedade 'products' deve ser um array não vazio, composto por objetos que possuam as seguintes propriedades: {id: string, quantity: number}.")
        }
        const idsRemoved = [...listId]
        
        const validateIds = await db('products').whereIn('id', listId)
      
        if(validateIds.length < listId.length){
            validateIds.map( async (item) => {
                     
                    if(listId.includes(item.id)){
                         idsRemoved.splice(idsRemoved.indexOf(item.id), 1)
                    }
            })

            if(idsRemoved.length > 0){
                res.status(400)
                throw new Error(`Os seguintes produtos não existem em nossa base de dados: '${JSON.stringify(idsRemoved)}'.`)
            }
        }

        const productsDb = (await db('products').select("id", "price")).map((item) => {
            const index = listId.indexOf(item.id)

            if(index !== -1){
                return item.price * listQuantity[index]
            }

            return 0
        })
        
        const totalPrice = productsDb.map(value => value).reduce((accumulator, currentVuleu) => accumulator + currentVuleu, 0)

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
        ).then(async () => {

            const insertValues = listId.map((idProduct, index) => {
                return {
                    purchase_id: id,
                    product_id: idProduct,
                    quantity: listQuantity[index]
                }
            })

            await db('purchases_products').insert(insertValues)

            res.status(201).json(
                {
                    message: "Pedido realizado com sucesso"
                }
            )
            
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar sua compra, tente novamente. " + err)
        })

    } catch (error: any) {
        return res.json({ error: error.message })
       
    }
}