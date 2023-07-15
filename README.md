# labecommerce-backend

## [Documentação](https://documenter.getpostman.com/view/26586405/2s93sgXr7N)

## Resumo

API de comunicação com um banco de dados que armazena informações de um e-commerce.
Essa api nos retorna uma lista de usuários, lista de produtos e nos mostra uma compra em específico, nela também podemos cadastrar produtos, novos usuários e criar compras. Além disso, é possível editar um produto e deletar uma compra.


 ## Get all users
Retorna todas as pessoas cadastradas.<br>
![image get all users](./printsLabecommerceBackend/getAllUsers.png)

## Create user
- Cadastra uma nova pessoa.V

  *Dados obrigatóros:* 

 ```typescript
    {
        id: string,
        name: string,
        email: string,
        password: string

    }
 ```
![createUser](./printsLabecommerceBackend/createUser.png)
 - [x]  Create user
![create user](./printsLabecommerceBackend/createUser.png)
 - [x]  Delete user by id

 - [x]  Create product
 - [x]  Get all products 
 - [x]  Edit product by id
 - [x]  Create purchase
 - [x]  Delete purchase by id
 - [x]  Get purchase by id
