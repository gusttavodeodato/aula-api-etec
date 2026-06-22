import express from "express";
import userModel from "../model/userModel.js";
import profileModel from "../model/profileModel.js";
import { appDataSource } from "../database/config.js";
import { IsNull } from "typeorm";
import multer from "multer";
import cloudinary from "../helpers/cloudinary.js"; 
import fs from "fs";

const route = express.Router();
const userRepository = appDataSource.getRepository(userModel);
const uploadRepository = appDataSource.getRepository(profileModel);

const upload = multer({ dest: "./src/upload/ "});

route.post("/", upload.single("uploads"), async (request, response) => {

    try {
        if(!request.file) {
            return response.status(400).send({message: "Imagem não enviada."});
        }

        const user = await userRepository.findOneBy({
            email: request.user.email,
            deletedAt: IsNull()
        });

        if(!user) {
            return response.status(401).send({message: "Falha no upload. Refaça seu login."});
        }

        const result = await cloudinary.uploader.upload(request.file.path);
        const urlUpload = result.secure_url
        
        const profile = uploadRepository.create({url_photo_profile: urlUpload, user});
        await uploadRepository.save(profile);

        fs.unlinkSync(request.file.path);

        response.send({message: "Imagem salva com sucesso!", urlUpload});
    } catch (err) {
        console.error(err);
        response.status(500).send({message: "Erro ao fazer upload para o Cloudinary"});
    }
});

export default route;