const Phone = require('../models/phone');

async function obtenerTodosLosTelefonos(req, res) {
  try {
    const telefonos = await Phone.findAll();
    res.json(telefonos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerTelefonoPorIMEI(req, res) {
  const { imei } = req.body;
  try {
    const telefono = await Phone.findByPk(imei);
    if (!telefono) {
      return res.status(404).json({ error: 'Teléfono no encontrado' });
    }
    res.json(telefono);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function agregarTelefono(req, res) {
  const { modelo, marca, precio } = req.body;
  try {
    const imei = 'IMEI-' + Math.floor(Math.random() * 1000000000000);
    await Phone.create({ imei, modelo, marca, precio });
    res.status(201).json({ mensaje: 'Teléfono agregado exitosamente', imei });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function actualizarTelefono(req, res) {
  const { imei, modelo, marca, precio } = req.body;
  try {
    console.log(`Intentando actualizar teléfono con IMEI: ${imei}`);
    const telefono = await Phone.findByPk(imei);
    if (!telefono) {
      return res.status(404).json({ error: 'Teléfono no encontrado' });
    }
    await telefono.update({ modelo, marca, precio });
    res.json({ mensaje: `Teléfono con IMEI ${imei} actualizado exitosamente` });
  } catch (error) {
    console.error('Error al actualizar teléfono:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function eliminarTelefono(req, res) {
  const { imei } = req.body;
  try {
    console.log(`Intentando eliminar teléfono con IMEI: ${imei}`);
    const telefono = await Phone.findByPk(imei);
    if (!telefono) {
      return res.status(404).json({ error: 'Teléfono no encontrado' });
    }
    await telefono.destroy();
    res.json({ mensaje: `Teléfono con IMEI ${imei} eliminado exitosamente` });
  } catch (error) {
    console.error('Error al eliminar teléfono:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  obtenerTodosLosTelefonos,
  obtenerTelefonoPorIMEI,
  agregarTelefono,
  actualizarTelefono,
  eliminarTelefono
};
