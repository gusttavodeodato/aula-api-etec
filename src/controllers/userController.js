import express from 'express';

const route = express.Router();

// request o que front envia para o back, response é a resposta do backend devolvendo ao front
route.get("/", (request, response) => {
    return response.status(200).send({
        "name": "Gustavo",
        "age": 21,
        "marriage": false
    });
});

route.post("/", (request, response) => {
    return response.status(201).send({
        "message" : "usuário cadastrado com sucesso."
    });
});

route.put("/", (request, response) => {
    return response.status(200).send({
        "message" : "dados do usuário atualizado."
    });
});

route.delete("/", (request, response) => {
    return response.status(200).send({
        "message" : "todos os dados do usuário foram deletados."
    });
});

export default route;