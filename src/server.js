const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { getAllPhones, getPhoneByIMEI, addPhone, updatePhone, deletePhone, Phone } = require('./models/phone');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/rpc', (req, res) => {
  const jsonRPCRequest = req.body;

  // Manejar la solicitud JSON-RPC
  const response = handleRPCRequest(jsonRPCRequest);

  // Enviar la respuesta JSON-RPC
  res.json(response);
});

// Función para manejar las solicitudes JSON-RPC
function handleRPCRequest(jsonRPCRequest) {
  const { method, params, id } = jsonRPCRequest;

  switch (method) {
    case 'getAllPhones':
      return { jsonrpc: '2.0', result: getAllPhones(), id };
    case 'getPhoneByIMEI':
      return { jsonrpc: '2.0', result: getPhoneByIMEI(params.imei), id };
    case 'addPhone':
      const newPhone = new Phone(params.imei, params.model, params.brand, params.price);
      addPhone(newPhone);
      return { jsonrpc: '2.0', result: newPhone, id };
    case 'updatePhone':
      updatePhone(params.imei, { model: params.model, brand: params.brand, price: params.price });
      return { jsonrpc: '2.0', result: `Phone with IMEI ${params.imei} updated`, id };
    case 'deletePhone':
      deletePhone(params.imei);
      return { jsonrpc: '2.0', result: `Phone with IMEI ${params.imei} deleted`, id };
    default:
      return { jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id };
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
