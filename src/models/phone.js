const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Phone = sequelize.define('Phone', {
  imei: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING
  },
  brand: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'phones',
  timestamps: false
});

module.exports = Phone;

