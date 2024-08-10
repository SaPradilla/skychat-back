import { Server } from "./presentation/server";
import { envs } from './config/envs';
import { Routes } from './presentation/routes';
import { MongoDatabase } from "./data/mongodb/mongo-database";


(()=>{
    app();
})()

async function app() {
 
    await MongoDatabase.connect(
        envs.MONGO_DB_URL
    )

    new Server({
        port:envs.PORT,
        routes:Routes.routes
    }).start()

}