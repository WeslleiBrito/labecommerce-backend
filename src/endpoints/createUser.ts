import { Request, Response } from 'express'
import { db } from '../database/knex'

export const createUser = async (req: Request, res: Response) => {

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
            res.status(201).json(
                {
                    message: "Cadastro realizado com sucesso"
                }
            )
        }).catch((err) => {
            res.status(500)
            throw new Error("Tivemos um problema para finalizar seu cadastro, tente novamente. " + err)
        })


    } catch (error: any) {
        res.json(
            {
                error: error.message
            }
        )
    }


}