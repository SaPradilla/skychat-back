import { CustomError, UserEntity } from "../../domain";


export class UserMapper{


    static userEntityObeject( object:{[key:string]:any} ) {

        const { id,_id,username,email,password  }  = object;

        if(!id||!_id) throw CustomError.badRequest('Missing id');

        if(!username) throw CustomError.badRequest('Missing username');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!password) throw CustomError.badRequest('Missing password');


        return new UserEntity(
            _id || id,
            username,
            email,
            password,
        )
    }


}