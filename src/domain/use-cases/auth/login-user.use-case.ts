import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { AuthRepository } from '../../repositories/auth.repository';
import { CustomError } from '../../errors/custom.error';



interface UserToken {
    token:string;
    user:{
        id:string;
        username:string;
        email:string;
    };
}

type SignToken = (payload : Object, Duration?:string)=> Promise<string | null>;



interface LoginUseCase{
    execute( loginUserDto:LoginUserDto ) : Promise<UserToken>;
}

export class LoginUser implements LoginUseCase{

    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}


    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        const user = await this.authRepository.login(loginUserDto );
        
        const token = await this.signToken({
            id:user.id,
            username:user.username,
        });
        
        if ( !token ) throw CustomError.internalServer('Error generating token');
        
        return {
            token: token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            }
        };
    
    }

}