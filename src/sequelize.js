const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phone_store', 'postgres', 'Andres21plus.', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
