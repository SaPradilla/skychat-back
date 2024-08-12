import express,{ Application, Router } from "express"


interface Options{
    port:number;
    routes:Router;
}


export class Server{

    public readonly app:Application = express();
    private readonly port : number;
    private readonly routes:  Router;


    constructor(options: Options){
        const { port,routes } = options;


        this.port = port;
        this.routes = routes
    }

    middleware(){
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true}) )
    }


    async start(){

        this.middleware();

        this.app.use('/api/v1' ,this.routes )


        this.app.listen(this.port,()=>{
            console.log(`Server running in http://localhost:${this.port}/api/v1`);
        })



    }

}