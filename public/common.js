const apiUrl = '/rpc';

async function llamadaRPC(metodo, params = {}) {
  console.log('Llamada RPC:', metodo, params); // Log para depuración
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ metodo, params })
  });
  if (!response.ok) {
    return response.json().then(error => {
      throw new Error(error.error || `Error al ${metodo}`);
    });
  }
  return await response.json();
}

function obtenerTodosLosTelefonos() {
  llamadaRPC('obtenerTodosLosTelefonos')
  .then(data => {
    llenarTablaAdmin(data);
    llenarTablaCliente(data);
  })
  .catch(error => {
    console.error('Error al obtener los teléfonos:', error);
  });
}
