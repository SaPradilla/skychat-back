

import { BcryptAdapter } from '../../config/bcrypt';
import { UserModel } from '../../data/mongodb/models/User.model';
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../';


type HashFunction = (password:string) => string;
type CompareFunction = (password:string, hashed:string) => boolean;

    
export class AuthDatasourceImpl implements AuthDatasource{


    constructor(
        private readonly hashPassword : HashFunction = BcryptAdapter.hash,
        private readonly comparePassword : CompareFunction = BcryptAdapter.compare,
    ){}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const {email,passsword} = loginUserDto;


        try {
            
            const user = await UserModel.findOne({email});
            if( !user ) throw CustomError.badRequest('Incorrect information');

            const isMatch = this.comparePassword(passsword,user.password);

            if( !isMatch )  throw CustomError.badRequest('Incorrect information');

            return UserMapper.userEntityObeject(user)


        } catch (error) {
            if( error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }

    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {


        const { email,password,username } = registerUserDto;

        try {
            

            const existEmail = await UserModel.findOne({email:email});
            if(existEmail) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                username:username,
                email:email,
                password:this.hashPassword(password),
            });

            await user.save();

            return UserMapper.userEntityObeject(user);

        } catch (error) {
            if( error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }

    }

    

}