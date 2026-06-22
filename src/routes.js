import express from "express";
import userController from "./controllers/userController.js";
import actorController from "./controllers/actorController.js"
import directorController from "./controllers/directorController.js";
import generoController from "./controllers/generoController.js";
import premiacaoController from "./controllers/premiacaoController.js";
import loginController from "./controllers/loginController.js";
import uploadController from "./controllers/uploadController.js";
import { authenticate } from "./utils/jwt.js";

// variavel routes instanciando express
const routes = express();

routes.use("/user", userController);
routes.use("/actor", authenticate, actorController);
routes.use("/director", authenticate, directorController);
routes.use("/genero", authenticate, generoController);
routes.use("/premiacao", authenticate, premiacaoController);
routes.use("/upload", authenticate, uploadController);
routes.use("/login", loginController);

export default routes;