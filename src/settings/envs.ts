import 'dotenv/config'
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGODB_URI: string;
  DB_USERNAME: string;
  DB_DATABASE: string;
  DB_PASSWORD: string;
  DB_HOSTNAME: string;
  DB_PORT: number;
  SECRET_KEY: string;
  ACCESS_TOKEN_TELEGRAM: string;
  MYSQL_HOSTNAME: string;
  MYSQL_PORT: number;
  MYSQL_DATABASE: string;
  MYSQL_USERNAME: string;
  MYSQL_PASSWORD: string;
  SQLSERVER_HOSTNAME: string,
  SQLSERVER_PORT: number;
  SQLSERVER_DATABASE: string;
  SQLSERVER_USERNAME: string;
  SQLSERVER_PASSWORD: string;
  PERCENTAGE_INCREMENT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MONGODB_URI: joi.string(),
  DB_USERNAME: joi.string(),
  DB_DATABASE: joi.string(),
  DB_PASSWORD: joi.string(),
  DB_HOSTNAME: joi.string(),
  DB_PORT: joi.number(),
  SECRET_KEY: joi.string(),
  ACCESS_TOKEN_TELEGRAM: joi.string(),
  MYSQL_HOSTNAME: joi.string(),
  MYSQL_PORT: joi.number(),
  MYSQL_DATABASE: joi.string(),
  MYSQL_USERNAME: joi.string(),
  MYSQL_PASSWORD: joi.string(),
  SQLSERVER_HOSTNAME: joi.string(),
  SQLSERVER_PORT: joi.number(),
  SQLSERVER_DATABASE: joi.string(),
  SQLSERVER_USERNAME: joi.string(),
  SQLSERVER_PASSWORD: joi.string(),
  PERCENTAGE_INCREMENT: joi.string(),
})
  .unknown(true)

const {error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;
export const envs = {
  port: envVars.PORT,
  mongo_uri: envVars.MONGODB_URI,
  db_username: envVars.DB_USERNAME,
  db_database: envVars.DB_DATABASE,
  db_password: envVars.DB_PASSWORD,
  db_hostname: envVars.DB_HOSTNAME,
  db_port: envVars.DB_PORT,
  secret_key: envVars.SECRET_KEY,
  access_token_telegram: envVars.ACCESS_TOKEN_TELEGRAM,
  mysql_hostname: envVars.MYSQL_HOSTNAME,
  mysql_port: envVars.MYSQL_PORT,
  mysql_database: envVars.MYSQL_DATABASE,
  mysql_username: envVars.MYSQL_USERNAME,
  mysql_password: envVars.MYSQL_PASSWORD,
  sqlserver_hostname: envVars.SQLSERVER_HOSTNAME,
  sqlserver_port: envVars.SQLSERVER_PORT,
  sqlserver_database: envVars.SQLSERVER_DATABASE,
  sqlserver_username: envVars.SQLSERVER_USERNAME,
  sqlserver_password: envVars.SQLSERVER_PASSWORD,
  percentage_increment: envVars.PERCENTAGE_INCREMENT,
}