import express from 'express';
import { appDataSource } from "../database/config.js";  
import premiacaoModel from "../model/premiacaoModel.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();

const premiacaoTable = appDataSource.getRepository(premiacaoModel);


route.get("/", async (request, response) => {
    const listarPremio = await premiacaoTable.findBy({deleted_at: IsNull()});

    return response.status(200).send({message: listarPremio});
});

route.get("/:name_premiacao", async (request, response) => {
    const {name_premiacao} = request.params;
    const listarPremioName = await premiacaoTable.findBy({name_premiacao: Like(`%${name_premiacao}%`)});

    return response.status(200).send({message: listarPremioName});
})


route.post("/", async (request, response) => {
    const {name_premiacao, valor_premio} = request.body;

    if (name_premiacao === "" && valor_premio === "") {
        return response.status(400).send({message: "Nenhum dado para cadastrar, é necessário preencher Nome e Valor."})
    }
    
    if (!name_premiacao || name_premiacao.trim() === "") {
        return response.status(400).send({message: "O nome da premiação não pode ser nulo (em branco)."})
    } 
    
    if (valor_premio === "" || valor_premio <= 0) {
        return response.status(400).send({message: "O valor do prêmio não pode ser 0 (zero) ou nulo."})
    }
    
    const dataPremio = premiacaoTable.create({name_premiacao, valor_premio});
    await premiacaoTable.save(dataPremio);
    
    return response.status(201).send({message: "Premiação cadastrada com sucesso."})
});


route.put("/:id", async (request, response) => {
    const {name_premiacao, valor_premio} = request.body;
    const {id} = request.params;

    if(name_premiacao) {
        if(name_premiacao === "" && valor_premio === "") {
            return response.status(400).send({message: "Nenhum dado para atualizar."})
    }}
    
    if (!name_premiacao || name_premiacao.trim() === "") {
        return response.status(400).send({message: "O nome da premiação não pode ser nulo (em branco)."})
    } 
    
    if(valor_premio) {
        if(valor_premio === "" || valor_premio <= 0) {
            return response.status(400).send({message: "O valor do prêmio não pode ser 0 (zero) ou nulo."})
    }}

    await premiacaoTable.update({id}, {name_premiacao, valor_premio});

    return response.status(200).send({message: "Dados de premiação atualizado com sucesso"});
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await premiacaoTable.update({id}, {deleted_at: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({message: "Dados de premiação excluídos com sucesso."});
})

export default route;