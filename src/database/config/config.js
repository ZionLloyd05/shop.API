require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    username: 'postgres',
    password: 'dami123',
    database: 'shopDB',
    host: '127.0.0.1',
    port: 5432,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    username: 'postgres',
    password: 'dami123',
    database: 'test_shopDB',
    host: '127.0.0.1',
    port: 5432,
  },
  production: {
    url: '',
    dialect: '',
  },
};
