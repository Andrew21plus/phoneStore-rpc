document.addEventListener('DOMContentLoaded', function() {
  mostrarVistaAdmin();
  mostrarVistaCliente();
});

function llenarTablaCliente(data) {
  const clientPhonesTable = document.getElementById('tabla-telefonos-cliente');
  clientPhonesTable.innerHTML = '';
  data.forEach(phone => {
    const row = `
      <tr>
        <td>${phone.imei}</td>
        <td>${phone.modelo}</td>
        <td>${phone.marca}</td>
        <td>${phone.precio}</td>
        <td>
          <button onclick="comprarTelefono('${phone.imei}')">Comprar</button>
        </td>
      </tr>`;
    clientPhonesTable.innerHTML += row;
  });
}

function comprarTelefono(imei) {
  if (confirm(`¿Está seguro de que desea comprar el teléfono con IMEI ${imei}?`)) {
    llamadaRPC('eliminarTelefono', { imei })
    .then(() => {
      alert('Teléfono comprado exitosamente');
      obtenerTodosLosTelefonos(); // Refresh the list after buying a phone
    })
    .catch(error => {
      console.error('Error al comprar el teléfono:', error);
    });
  }
}

function mostrarVistaCliente() {
  document.getElementById('vista-admin').classList.add('oculto');
  document.getElementById('vista-cliente').classList.remove('oculto');
}
