import express from 'express';
import { appDataSource } from "../database/config.js";  
import userModel from "../model/userModel.js";

const route = express.Router();

const userTable = appDataSource.getRepository(userModel);


route.post("/", async (request, response) => {
    const {name, email, password, typeUser} = request.body;

    if (name.length < 2) {
        return response.status(400).send({message: "O nome deve conter mais de 2 caracteres."});
    }

    if (!email.includes("@")) {
        return response.status(400).send({message: "O email deve conter um '@'."});
    }

    if (password.length <= 6) {
        return response.status(400).send({message: "A senha deve conter mais de 6 caracteres."});
    }

    if (typeUser.toLowerCase() !== "admin" && typeUser.toLowerCase() !== "comum") {
        return response.status(400).send({message: "O tipo de usuário deve ser 'admin' ou 'comum'."});
    }

    const dataUser = userTable.create({name, email, password, typeUser});
    await userTable.save(dataUser);

    return response.status(201).send({message: "Usuário cadastrado com sucesso!"});
});

export default route;