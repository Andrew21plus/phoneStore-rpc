const Phone = require('../models/phone');

async function getAllPhonesRPC(req, res) {
  try {
    const phones = await Phone.findAll();
    res.json(phones);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPhoneByIMEIRPC(req, res) {
  const { imei } = req.body;
  try {
    const phone = await Phone.findByPk(imei);
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }
    res.json(phone);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addPhoneRPC(req, res) {
  const { model, brand, price } = req.body;
  try {
    const imei = 'IMEI-' + Math.floor(Math.random() * 1000000000000);
    await Phone.create({ imei, model, brand, price });
    res.status(201).json({ message: 'Phone added successfully', imei });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updatePhoneRPC(req, res) {
  const { imei, model, brand, price } = req.body;
  try {
    console.log(`Attempting to update phone with IMEI: ${imei}`);
    const phone = await Phone.findByPk(imei);
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }
    await phone.update({ model, brand, price });
    res.json({ message: `Phone with IMEI ${imei} updated successfully` });
  } catch (error) {
    console.error('Error updating phone:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deletePhoneRPC(req, res) {
  const { imei } = req.body;
  try {
    console.log(`Attempting to delete phone with IMEI: ${imei}`);
    const phone = await Phone.findByPk(imei);
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }
    await phone.destroy();
    res.json({ message: `Phone with IMEI ${imei} deleted successfully` });
  } catch (error) {
    console.error('Error deleting phone:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllPhonesRPC,
  getPhoneByIMEIRPC,
  addPhoneRPC,
  updatePhoneRPC,
  deletePhoneRPC
};
