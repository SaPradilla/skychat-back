import mongoose from "mongoose";



export class MongoDatabase{


    static async connect(mongoUrl : string){

        try {
          
          await mongoose.connect(mongoUrl);
          console.log('Mongo connected C:');
  
          return true;
  
        } catch (error) {
          console.log('Mongo connection');
          throw error;
        }
    }

}