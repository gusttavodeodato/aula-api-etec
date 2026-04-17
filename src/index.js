import express from "express";
import routes from "./routes.js";
import { appDataSource } from "./database/config.js"; // variavel com configurações do banco

const server = express();
server.use(express.json()); // para o express entender o formato json 
server.use("/", routes);

appDataSource.initialize().then(async() => {
    console.log("Connect!");

    server.listen(3333, () => {
    console.log("Server is running, door 3333.");
});
}).catch((err) => {
    console.log("Failed." + err);
})
