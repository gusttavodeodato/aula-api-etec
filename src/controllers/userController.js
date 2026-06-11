import express from 'express';
import { appDataSource } from "../database/config.js";  
import userModel from "../model/userModel.js";
import {IsNull, Like} from "typeorm";
import * as userService from "../services/userService.js";

const route = express.Router();

const userTable = appDataSource.getRepository(userModel);

route.get("/", async (request, response) => {
    
    try {
        const users = await userService.listUsers();
        return response.status(201).send({message: users});

    } catch (err) {
        return response.status(err.status || 500).send({message: err.message});
    }
});

route.get("/:name", async (request, response) => {
    
    try {
        const users = await userService.listUsersByName(request.params.name);
        return response.status(200).send({message: users});

    } catch (err) {
        return response.status(err || 500).send({message: err.message});
    }
});


route.post("/", async (request, response) => {

    try {
        const message = await userService.createUser(request.body);
        return response.status(201).send({message});

    } catch (err) {
        return response.status(err.status || 500).send({ message: err.message });
    }

});

route.put("/:id", async (request, response) => {
    
    try {
        const message = await userService.updateUsers(request.params.id, request.body);
        return response.status(200).send({message});
        
    } catch (err) {
        return response.status(err.status || 500).send({message: err.message})
    }
  
});

/* Hard Delete = exclui linha do banco *
/* route.delete("/:id", async (request, response ) => {
    const {id} = request.params;

    console.log(request.params);
    //await userTable.delete({id});

    return response.status(200).send({message: "Os dados foram excluídos."});
}); */


/* Soft Delete */
route.delete("/:id", async (request, response) => {
    
    try {
        const message = await userService.deleteUser(request.params.id);
        
        return response.status(200).send({message});

    } catch (err) {
        return response.status(err.status || 500).send({message: err.message});
    }
});


export default route;