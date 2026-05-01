import express from 'express';
import { appDataSource } from "../database/config.js";  
import generoModel from "../model/generoModel.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();

const generoTable = appDataSource.getRepository(generoModel);


route.get("/", async (request, response) => {
    const listarGenderMovie = await generoTable.findBy({deleted_at: IsNull()});

    return response.status(200).send({message: listarGenderMovie});
});

route.get("/:name_genero", async (request, response) => {
    const {name_genero} = request.params;
    const listarGenderMovieBy = await generoTable.findBy({name_genero: Like(`%${name_genero}%`)});

    return response.status(200).send({message: listarGenderMovieBy});
})

route.post("/", async (request, response) => {
    const {name_genero} = request.body;

    if(!name_genero || name_genero.trim() == "") {
        return response.status(400).send({message: "O gênero não pode ser nulo (em branco)"})
    }

    if(name_genero.length < 3 || name_genero > 30) {
        return response.status(400).send({message: "O gênero deve ter entre 3 a 30 caracteres."})
    }

    const dataGenero = generoTable.create({name_genero});
    await generoTable.save(dataGenero);

    return response.status(200).send({message: "Cadastrado com sucesso!"});
});

route.put("/:id", async (request, response) => {
    const {name_genero} = request.body;
    const {id} = request.params;

    if(name_genero) {
        if(name_genero === "") {
            return response.status(400).send({message: "Nenhum dado para atualizar."});
    }}
    
    if(!name_genero || name_genero.trim() == "") {
        return response.status(400).send({message: "O gênero não pode ser nulo (em branco)"})
    }

    if(name_genero.length < 3 || name_genero > 30) {
        return response.status(400).send({message: "O gênero deve ter entre 3 a 30 caracteres."})
    }

    await generoTable.update({id}, {name_genero});

    return response.status(200).send({message: "Dados do gênero foram atualizados com sucesso."});
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await generoTable.update({id}, {deleted_at: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({message: "Dados do gênero foram exluídos com sucesso."})
})

export default route;