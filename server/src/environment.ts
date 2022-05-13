// For local running create a .env file and put all necessary ENV values there in the format:
// VARIABLE_NAME="STRING_VALUE"
// VARIABLE_NAME=1234
//
// For DATABASE_URL take the value from "heroku config" to config to the deployed database.
// Generating migrations requires a local database as Prisma can't create shadow database on Heroku

export const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  LOGIN_CREDENTIALS_HASH: process.env.LOGIN_CREDENTIALS_HASH,
};
