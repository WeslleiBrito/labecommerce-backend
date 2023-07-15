import express from 'express'
import cors from 'cors'
import { createUser } from './endpoints/createUser'
import { getAllUsers } from './endpoints/getAllUsers'
import { createProduct } from './endpoints/createProduct'
import { getAllProducts } from './endpoints/getAllProducts'
import { editProductById } from './endpoints/editProductById'
import { createPurchase } from './endpoints/createPurchase'
import { deletePurchaseById } from './endpoints/deletePurchaseById'
import { getPurchaseById } from './endpoints/getPurchaseById'

const app = express()

app.use(express.json())

app.use(cors())


//Get all users
app.get('/users', getAllUsers)

//Create user
app.post('/users', createUser)

//Create product
app.post('/products', createProduct)

//Get all products funcionalidades 1 e 2
app.get('/products', getAllProducts)

//Edit product by id
app.put('/products/:id', editProductById)

//Create purchase
app.post('/purchases', createPurchase)

//Delete purchase by id
app.delete('/purchases/:id', deletePurchaseById)

//Get purchase by id
app.get('/purchases/:id', getPurchaseById)


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})