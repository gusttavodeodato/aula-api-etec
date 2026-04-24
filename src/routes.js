import express from "express";
import userController from "./controllers/userController.js";
import actorController from "./controllers/actorController.js"
import directorController from "./controllers/directorController.js";
import generoController from "./controllers/generoController.js";
import premiacaoController from "./controllers/premiacaoController.js";

// variavel routes instanciando express
const routes = express();

routes.use("/user", userController);
routes.use("/actor", actorController);
routes.use("/director", directorController);
routes.use("/genero", generoController);
routes.use("/premiacao", premiacaoController);

export default routes;