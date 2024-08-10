import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthController } from "./controller";


export class AuthRoutes{


    static get routes():Router{


        const router = Router()


        const datasource = new AuthDatasourceImpl();

        const authRespository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRespository);

        router.post('/register',controller.registerUser)

        return router
    }

}