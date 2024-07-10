const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phone_store', 'postgres', 'salchipapa123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
