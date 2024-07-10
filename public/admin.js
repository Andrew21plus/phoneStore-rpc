document.addEventListener('DOMContentLoaded', function() {
  mostrarVistaAdmin();
  mostrarVistaCliente();
});

function llenarTablaAdmin(data) {
  const phonesTable = document.getElementById('tabla-telefonos');
  phonesTable.innerHTML = '';
  data.forEach(phone => {
    const row = `
      <tr>
        <td>${phone.imei}</td>
        <td><input type="text" class="edit-input model-input" value="${phone.modelo}" /></td>
        <td><input type="text" class="edit-input brand-input" value="${phone.marca}" /></td>
        <td><input type="number" class="edit-input price-input" value="${phone.precio}" /></td>
        <td>
          <button onclick="guardarTelefono('${phone.imei}', this)">Guardar</button>
          <button onclick="eliminarTelefono('${phone.imei}')">Eliminar</button>
        </td>
      </tr>`;
    phonesTable.innerHTML += row;
  });
}

function agregarTelefono() {
  const modelo = document.getElementById('modelo').value;
  const marca = document.getElementById('marca').value;
  const precio = document.getElementById('precio').value;

  if (!modelo || !marca || !precio) {
    alert('Por favor complete todos los campos');
    return;
  }

  if (isNaN(precio) || precio <= 0) {
    alert('Por favor ingrese un precio válido');
    return;
  }

  llamadaRPC('agregarTelefono', { modelo, marca, precio })
  .then(response => {
    const { mensaje, imei } = response;
    alert(`${mensaje} IMEI: ${imei}`);
    document.getElementById('modelo').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('precio').value = '';
    obtenerTodosLosTelefonos();
  })
  .catch(error => {
    console.error('Error al agregar el teléfono:', error);
  });
}

function actualizarTelefono(imei, modelo, marca, precio) {
  if (!modelo || !marca || !precio) {
    alert('Por favor complete todos los campos');
    return;
  }

  if (isNaN(precio) || precio <= 0) {
    alert('Por favor ingrese un precio válido');
    return;
  }

  llamadaRPC('actualizarTelefono', { imei, modelo, marca, precio })
  .then(() => {
    alert('Teléfono actualizado');
    obtenerTodosLosTelefonos(); // Refresh the list after updating a phone
  })
  .catch(error => {
    console.error('Error al actualizar el teléfono:', error);
  });
}

function eliminarTelefono(imei) {
  if (confirm(`¿Está seguro de que desea eliminar el teléfono con IMEI ${imei}?`)) {
    llamadaRPC('eliminarTelefono', { imei })
    .then(() => {
      obtenerTodosLosTelefonos(); // Refresh the list after deleting a phone
    })
    .catch(error => {
      console.error('Error al eliminar el teléfono:', error);
    });
  }
}

function guardarTelefono(imei, button) {
  const row = button.parentNode.parentNode;
  const modelInput = row.querySelector('.model-input');
  const brandInput = row.querySelector('.brand-input');
  const priceInput = row.querySelector('.price-input');

  const modeloActualizado = modelInput.value;
  const marcaActualizada = brandInput.value;
  const precioActualizado = priceInput.value;

  actualizarTelefono(imei, modeloActualizado, marcaActualizada, precioActualizado);
}

function mostrarVistaAdmin() {
  document.getElementById('vista-admin').classList.remove('oculto');
  document.getElementById('vista-cliente').classList.add('oculto');
}
