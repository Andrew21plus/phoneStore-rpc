const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  getAllPhonesRPC,
  getPhoneByIMEIRPC,
  addPhoneRPC,
  updatePhoneRPC,
  deletePhoneRPC
} = require('./controllers/phonesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/rpc', async (req, res) => {
  const { method, params } = req.body;
  switch (method) {
    case 'getAllPhones':
      await getAllPhonesRPC(req, res);
      break;
    case 'getPhoneByIMEI':
      await getPhoneByIMEIRPC(req, res);
      break;
    case 'addPhone':
      req.body = params;
      await addPhoneRPC(req, res);
      break;
    case 'updatePhone':
      req.body = params;
      await updatePhoneRPC(req, res);
      break;
    case 'deletePhone':
      req.body = params;
      await deletePhoneRPC(req, res);
      break;
    default:
      res.status(400).json({ error: 'Unknown RPC method' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
