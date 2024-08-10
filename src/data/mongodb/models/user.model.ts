import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({

    username:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true, 
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    pronouns:{
        type:String
    },
    // status:{
        
    // },
    banner_image:{
        type:String,
    },
    avatar_image:{
        type:String,
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true,
    },
})

export const UserModel = mongoose.model('User',userSchema)