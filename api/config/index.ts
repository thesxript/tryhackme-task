import 'dotenv/config';

export const JWTSECERT =  process.env.TOKEN_SECRET ?? 'DevServer';
export const  DB_CONNECT = process.env.DB_CONNECT ?? 'localhost';
