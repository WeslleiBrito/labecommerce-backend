
import { createUser, getAllUsers } from "./database";


createUser({ name: "Manuel", email: "manuel@gmail.com", password: "newpassword123" })
getAllUsers()