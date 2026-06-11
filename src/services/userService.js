import { appDataSource } from "../database/config.js";
import userModel from "../model/userModel.js";
import {IsNull, Like } from "typeorm";

const userTable = appDataSource.getRepository(userModel);

export async function createUser({name, email, password, typeUser}) {

    if(name.length < 2) {
        throw {status: 400, message: "O nome deve conter mais de 2 caracteres."}
    }

    if(!email.includes("@")) {
        throw {status: 400, message: "O email deve conter um '@'."}
    }

    if(password.length <= 6) {
        throw {status: 400, message: "A senha deve conter mais de 6 caracteres"}
    }

    if(typeUser) {
        const typeLower = typeUser.toLowerCase();
        if(typeLower !== "admin" && typeLower !== "comum") {
            throw {status: 400, message: "O tipo de usuário deve ser 'admin' ou 'comum'."}
        }
    }

    const dataUser = userTable.create({
        name, email, password, typeUser
    });

    await userTable.save(dataUser);
    return "Usuário cadastro com sucesso!";
}

export async function listUsers() {
    return await userTable.findBy({deletedAt: IsNull()});
}

export async function listUsersByName(name) {
    const users = await userTable.findBy({name: Like(`%${name}%`), deletedAt: IsNull()});

    if(users.length < 1) {
        throw {status: 204, message: null};
    }
    
    return users;
}

export async function updateUsers(id, {name, email, password, typeUser}){

    if(!name && !email && !password && !typeUser) {
        throw {status: 400, message: "Nenhuma informação para atualizar."};
    }

    if(name !== undefined && name.trim().length < 3) {
        throw {status: 400, message: "O nome deve conter mais de 2 caracteres."};
    }

    if(email !== undefined){
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(email.trim())){
            throw {status: 400, message: "Por favor, informe um e-mail válido."};
        }
    }

    if(password !== undefined && password.length <= 6) {
        throw {status: 400, message: "A senha deve conter mais 6 caracteres."}
    }

    if(typeUser !== undefined) {
        const typeLower = typeLower.toLowerCase();
        if(typeLower !== "admin" && typeLower !== "comum") {
            throw {status: 400, message: "O tipo de usuário deve ser 'admin' ou 'comum'."};
        }
    }

    await userTable.update({id}, {name, email, password, typeUser});
    
    return "Dados do usuário atualizados com sucesso!";
}

export async function deleteUser(id) {
    await userTable.update({id}, { deletedAt: () => "CURRENT_TIMESTAMP" });

    return "Os dados do usuaŕio foram excluídos.";
}

/* Hard Delete = exclui linha do banco *
/* route.delete("/:id", async (request, response ) => {
    const {id} = request.params;

    console.log(request.params);
    //await userTable.delete({id});

    return response.status(200).send({message: "Os dados foram excluídos."});
}); 

export async function deleteUserAll(id) {
    await userTable.delete({id});

    return response.status(200).send({message: "Os dados foram excluídos permanentementes."});
} */