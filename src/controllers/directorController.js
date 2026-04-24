import express from 'express';
import { appDataSource } from "../database/config.js";  
import directorModel from "../model/directorModel.js";
import {Like} from "typeorm";

const route = express.Router();

const directorTable = appDataSource.getRepository(directorModel);

route.get("/", async (request, response) => {
    const listarDirector = await directorTable.find();

    return response.status(200).send({message: listarDirector});
});

route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const listarDirectorName = await directorTable.findBy({name: Like(`%${name}%`)});

    return response.status(200).send({message: listarDirectorName});   
})



route.post("/", async (request, response) => {
    const {name, sex, date_nasc, nacionality, photo_director} = request.body;

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
})

export default route;