class Phone {
  constructor(imei, model, brand, price) {
    this.imei = imei;
    this.model = model;
    this.brand = brand;
    this.price = price;
  }
}

const phones = []; // Aquí almacenaremos los teléfonos

function getAllPhones() {
  return phones;
}

function getPhoneByIMEI(imei) {
  return phones.find(phone => phone.imei === imei);
}

function addPhone(phone) {
  phones.push(phone);
}

function updatePhone(imei, updatedPhone) {
  const index = phones.findIndex(phone => phone.imei === imei);
  if (index !== -1) {
    phones[index] = { ...phones[index], ...updatedPhone };
  }
}

function deletePhone(imei) {
  const index = phones.findIndex(phone => phone.imei === imei);
  if (index !== -1) {
    phones.splice(index, 1);
  }
}

module.exports = {
  Phone,
  getAllPhones,
  getPhoneByIMEI,
  addPhone,
  updatePhone,
  deletePhone
};

  