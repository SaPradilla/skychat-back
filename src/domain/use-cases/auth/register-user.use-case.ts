import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { AuthRepository } from '../../repositories/auth.repository';
import { JwtAdapter } from '../../../config/jwt';
import { CustomError } from '../../errors/custom.error';
import { UserAuthResponse } from 'skychat';


type SignToken = (payload : Object, Duration?:string)=> Promise<string | null>;


interface RegisterUserUseCase{
    execute( registerUserDto: RegisterUserDto) : Promise<UserAuthResponse>;
}

export class RegisterUser implements RegisterUserUseCase{


    constructor(
        private readonly authRepository : AuthRepository,
        private readonly signToken : SignToken = JwtAdapter.generateToken,
    ){}


    async execute(registerUserDto: RegisterUserDto): Promise<UserAuthResponse> {


        const user = await this.authRepository.register(registerUserDto);
        const token = await this.signToken({
            id:user.id,
            username:user.username,
        });
        if(!token) throw CustomError.internalServer('Error generating token');

        return{
            token:token,
            user:{
                id:user.id,
                username:user.username,
                email:user.email,
            }
        }

    }



    


}