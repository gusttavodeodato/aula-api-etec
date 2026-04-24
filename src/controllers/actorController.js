import express from 'express';
import { appDataSource } from "../database/config.js";  
import actorModel from "../model/actorModel.js";
import {Like} from "typeorm";

const route = express.Router();

const actorTable = appDataSource.getRepository(actorModel);

route.get("/", async (request, response) => {
    const listarActors = await actorTable.find();

    return response.status(200).send({message: listarActors});
});

route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const listarActorName = await actorTable.findBy({name: Like(`%${name}%`)});

    return response.status(200).send({message: listarActorName});   
})



route.post("/", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_actor} = request.body;

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

    console.log(request.body);

    const dataActor = actorTable.create({name, sex, date_nasc, nacionality, photo_actor});
    await actorTable.save(dataActor);

    return response.status(201).send({message: "Ator criado com sucesso."});
})

export default route;