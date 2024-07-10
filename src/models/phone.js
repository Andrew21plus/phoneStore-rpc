const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Phone = sequelize.define('Phone', {
  imei: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  modelo: {
    type: DataTypes.STRING
  },
  marca: {
    type: DataTypes.STRING
  },
  precio: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'phones',
  timestamps: false
});

module.exports = Phone;

