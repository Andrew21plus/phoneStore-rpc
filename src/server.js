const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  obtenerTodosLosTelefonos,
  obtenerTelefonoPorIMEI,
  agregarTelefono,
  actualizarTelefono,
  eliminarTelefono
} = require('./controllers/phonesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/rpc', async (req, res) => {
  const { metodo, params } = req.body;
  switch (metodo) {
    case 'obtenerTodosLosTelefonos':
      await obtenerTodosLosTelefonos(req, res);
      break;
    case 'obtenerTelefonoPorIMEI':
      await obtenerTelefonoPorIMEI(req, res);
      break;
    case 'agregarTelefono':
      req.body = params;
      await agregarTelefono(req, res);
      break;
    case 'actualizarTelefono':
      req.body = params;
      await actualizarTelefono(req, res);
      break;
    case 'eliminarTelefono':
      req.body = params;
      await eliminarTelefono(req, res);
      break;
    default:
      res.status(400).json({ error: 'Método RPC desconocido' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

module.exports = app;
