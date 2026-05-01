import express from 'express';
import { appDataSource } from "../database/config.js";  
import actorModel from "../model/actorModel.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();

const actorTable = appDataSource.getRepository(actorModel);

route.get("/", async (request, response) => {
    const listarActors = await actorTable.findBy({deleted_at: IsNull()});

    return response.status(200).send({message: listarActors});
});

route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const listarActorName = await actorTable.findBy({name: Like(`%${name}%`)});

    return response.status(200).send({message: listarActorName});   
})



route.post("/", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_actor} = request.body;

    if(name) {
        if(name == "" && sex == "" && date_nasc == "" && nacionality == "") {
            return response.status(400).send({message: "Nenhum dado do ator para seguir o cadastro."});
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

    console.log(request.body);

    const dataActor = actorTable.create({name, sex, date_nasc, nacionality, photo_actor});
    await actorTable.save(dataActor);

    return response.status(201).send({message: "Ator criado com sucesso."});
});

route.put("/:id", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_actor} = request.body;
    const {id} = request.params;


    if(name == "" && sex == "" && date_nasc == "" && nacionality == "") {
        return response.status(400).send({message: "Nenhum dado para atualizar"});
    }

    if(name.length < 2) {
        return response.status(400).send({message: "O nome deve conter mais de 2 caracteres."});
    }

    if(sex) {
        if (sex.toUpperCase() !== "M".toUpperCase() && sex.toUpperCase() !== "F".toUpperCase()) {
        return response.status(400).send({message: "O sexo deve ser informado como 'M' ou 'F'."})
    }}

    if(!date_nasc || date_nasc.trim() == ""){
        return response.status(400).send({message: "A data de nascimento não pode ser vazia."});
    }

    if(!nacionality || nacionality.trim() == "") {
        return response.status(400).send({message: "A nacionalidade não pode ser nula (em branco)."})
    }

    await actorTable.update({id}, {name, sex, date_nasc, nacionality, photo_actor});

    return response.status(200).send({message: "Dados do ator foram atualizados com sucesso."})
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await actorTable.update({id}, {deleted_at: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({message: "Dados do ator foram excluídos."})
})

export default route;