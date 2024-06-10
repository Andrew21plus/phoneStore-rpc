const { JSONRPCServer } = require('jsonrpc-lite');
const {
  getAllPhones,
  getPhoneByIMEI,
  addPhone,
  updatePhone,
  deletePhone,
  Phone
} = require('../models/phone');

const server = new JSONRPCServer();

server.addMethod('getAllPhones', () => {
  return getAllPhones();
});

server.addMethod('getPhoneByIMEI', ({ imei }) => {
  return getPhoneByIMEI(imei);
});

server.addMethod('addPhone', ({ imei, model, brand, price }) => {
  const newPhone = new Phone(imei, model, brand, price);
  addPhone(newPhone);
  return newPhone;
});

server.addMethod('updatePhone', ({ imei, model, brand, price }) => {
  const updatedPhone = { model, brand, price };
  updatePhone(imei, updatedPhone);
  return `Phone with IMEI ${imei} updated`;
});

server.addMethod('deletePhone', ({ imei }) => {
  deletePhone(imei);
  return `Phone with IMEI ${imei} deleted`;
});

module.exports = server;

