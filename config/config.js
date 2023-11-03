const dotenv = require('dotenv');
dotenv.config();

const config = {
  "development": {
    "username": process.env.DEVELOPMENT_NAME,
    "password": process.env.DEVELOPMENT_PASSWORD,
    "database": process.env.DEVELOPMENT_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
  },
  "test": {
    "username": process.env.TEST_NAME,
    "password": process.env.TEST_PASSWORD,
    "database": process.env.TEST_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PRODUCTION_NAME,
    "password": process.env.PRODUCTION_PASSWORD,
    "database": process.env.PRODUCTION_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config;