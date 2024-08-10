import 'dotenv/config';
import {get} from 'env-var'

export const envs ={
    PORT: get('PORT').required().asPortNumber(),
    JWT_KEY: get('JWT_KEY').required().asString(),
    MONGO_DB_URL: get('MONGO_DB_URL').required().asString(),
}