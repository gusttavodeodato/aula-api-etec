import express from "express";
import { appDataSource } from "../database/config.js";
import user from "../model/userModel.js";
import {IsNull} from "typeorm";
import { generateNewPassword } from "../utils/login.js";
import { sendEmail } from "../helpers/nodemailer.js";

const route = express.Router();
const userTable = appDataSource.getRepository(user);

route.post("/", async (request, response) => {
    const { email, password } = request.body;

    const loginUser = await userTable.findOneBy({email, password, deletedAt: IsNull()});

    if(loginUser) {
        return response.status(200).send({message: "Login efetuado com sucesso!"})
    } else {
        return response.status(401).send({message: "Login inválido."})
    }
    
});

route.put("/reset", async (request, response) => {
    const {email} = request.body;

    const user = await userTable.findOneBy({email, deletedAt: IsNull()});

    if(!user) {
        return response.status(400).send({message: "Email inválido."});
    }

    const newPassword = generateNewPassword();
    console.log("Chave " + newPassword);

    await userTable.update({email}, {password: newPassword});

    sendEmail(newPassword, user.email);

    return response.status(200).send({message: "Senha enviada para o email cadastrado."})
});

export default route;