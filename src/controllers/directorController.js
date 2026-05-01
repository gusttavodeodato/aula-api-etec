import express from 'express';
import { appDataSource } from "../database/config.js";  
import directorModel from "../model/directorModel.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();

const directorTable = appDataSource.getRepository(directorModel);

route.get("/", async (request, response) => {
    const listarDirector = await directorTable.findBy({deleted_at: IsNull()});

    return response.status(200).send({message: listarDirector});
});

route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const listarDirectorName = await directorTable.findBy({name: Like(`%${name}%`)});

    return response.status(200).send({message: listarDirectorName});   
})



route.post("/", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_director} = request.body;

    if(name == "" && sex == "" && date_nasc == "" && nacionality == "") {
        return response.status(400).send({message: "Nenhum dado do diretor para seguir o cadastro."});
    }

    if(name.length < 2) {
        return response.status(400).send({message: "O nome deve conter mais de 2 caracteres."});
    }
    
    if(sex.toUpperCase() !== "M".toUpperCase() && sex.toUpperCase() !== "F".toUpperCase()) {
        return response.status(400).send({message: "O sexo deve ser informado como 'M' ou 'F'."})
    }

    if(!date_nasc || date_nasc.trim() == ""){
        return response.status(400).send({message: "A data de nascimento não pode ser vazia."});
    }

    if(!nacionality || nacionality.trim() == "") {
        return response.status(400).send({message: "A nacionalidade não pode ser nula (em branco)."})
    }

    const dataDirector = directorTable.create({name, sex, date_nasc, nacionality, photo_director});
    await directorTable.save(dataDirector);

    return response.status(201).send({message: "Diretor criado com sucesso."});
});

route.put("/:id", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_director} = request.body;
    const {id} = request.params;

    if(name) {
        if(name == "" && sex == "" && date_nasc == "" && nacionality == "") {
            return response.status(400).send({message: "Nenhum dado para atualizar"});
    }}

    if(name.length < 2) {
        return response.status(400).send({message: "O nome deve conter mais de 2 caracteres."});
    }
    
    if(sex) {
        if(sex.toUpperCase() !== "M".toUpperCase() && sex.toUpperCase() !== "F".toUpperCase()) {
            return response.status(400).send({message: "O sexo deve ser informado como 'M' ou 'F'."})
    }}

    if(date_nasc) {
        if(!date_nasc || date_nasc.trim() == ""){
            return response.status(400).send({message: "A data de nascimento não pode ser vazia."});
    }}

    if(nacionality) {
        if(!nacionality || nacionality.trim() == "") {
            return response.status(400).send({message: "A nacionalidade não pode ser nula (em branco)."})
    }}

    await directorTable.update({id}, {name, sex, date_nasc, nacionality, photo_director});
    
    return response.status(200).send({message: "Dados do diretor foram atualizados com sucesso."});
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await directorTable.update({id}, {deleted_at: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({message: "Dados do diretor foram excluídos com sucesso."})
})

export default route;