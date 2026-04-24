import express from 'express';
import { appDataSource } from "../database/config.js";  
import userModel from "../model/userModel.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();

const userTable = appDataSource.getRepository(userModel);

route.get("/", async (request, response) => {
    const listarUsers = await userTable.findBy({deletedAt: IsNull()});

    return response.status(200).send({message: listarUsers});

});

route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const listarUserByName =  await userTable.findBy({name: Like(`%${name}%`), deletedAt: IsNull()});

    if(listarUserByName.length < 1) {
        return response.status(204).end();
    }

    return response.status(200).send({message: listarUserByName});
});


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

    if (typeUser.toUpperCase() !== "admin".toUpperCase() && typeUser.toUpperCase() !== "comum".toUpperCase()) {
        return response.status(400).send({message: "O tipo de usuário deve ser 'admin' ou 'comum'."});
    }

    const dataUser = userTable.create({name, email, password, typeUser});
    await userTable.save(dataUser);

    return response.status(201).send({message: "Usuário cadastrado com sucesso!"});
});

export default route;