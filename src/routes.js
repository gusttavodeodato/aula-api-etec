import express from "express";
import userController from "./controllers/userController.js";

// variavel routes instanciando express
const routes = express();

routes.use("/user", userController);

export default routes;