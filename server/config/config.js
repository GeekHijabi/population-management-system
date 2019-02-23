const dotenv = require('dotenv');

dotenv.config();
const {
  USERNAME, PASSWORD, DATABASE, DATABASE_TEST
} = process.env;
module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  test: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE_TEST,
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
