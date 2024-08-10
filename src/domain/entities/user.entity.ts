
export class UserEntity{
    constructor(
        public id:string,
        public username:string,
        public email:string,
        public password:string,
        public pronouns?:string,
        public banner_image?:string,
        public avatar_image?:string,
        public isVerify?:boolean,
        public isActive?:boolean,
    ){}
}