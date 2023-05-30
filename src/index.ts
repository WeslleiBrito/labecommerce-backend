
import { createProduct, createUser, getAllProducts, getAllUsers } from "./database";


createUser({ name: "Manuel", email: "manuel@gmail.com", password: "newpassword123" })
getAllUsers()

createProduct({
    name: "SSD Gamer",
    value: 399.00,
    description: "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
    imageUrl: "http//www.info.com/images/ssd-gamer"
})

getAllProducts()