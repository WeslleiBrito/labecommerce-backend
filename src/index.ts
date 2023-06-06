import express, { Request, Response } from 'express'
import cors from 'cors'


const app = express()

app.use(express.json())

app.use(cors())


app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("Pong!")
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})