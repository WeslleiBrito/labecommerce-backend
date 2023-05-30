import { users, products } from "./database";

users.map((user, index) => {

    console.log(`ID: ${user.id}\nNome: ${user.name}\nEmail: ${user.email}\nSenha: ${user.password}\nData de cadastro: ${user.createdAt}`)

    if (index) {
        console.log("=========================================================")
    }

})


products.map((product, index) => {

    console.log(`ID: ${product.id}\nNome: ${product.name}\nDescrição: ${product.description}\nValor: ${product.price}\nImagem URL: ${product.imageUrl}`)

    if (index) {
        console.log("=========================================================")
    }

})

