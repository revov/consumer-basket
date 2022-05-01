// For local running create a .env file and put all necessary ENV values there in the format:
// VARIABLE_NAME="STRING_VALUE"
// VARIABLE_NAME=1234
//
// For DATABASE_URL take the value from "heroku config"

export const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
