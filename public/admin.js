function populateAdminTable(data) {
    const phonesTable = document.getElementById('phones-table');
    phonesTable.innerHTML = '';
    data.forEach(phone => {
      const row = `
        <tr>
          <td>${phone.imei}</td>
          <td><input type="text" class="edit-input model-input" value="${phone.model}" /></td>
          <td><input type="text" class="edit-input brand-input" value="${phone.brand}" /></td>
          <td><input type="number" class="edit-input price-input" value="${phone.price}" /></td>
          <td>
            <button onclick="savePhone('${phone.imei}', this)">Save</button>
            <button onclick="deletePhone('${phone.imei}')">Delete</button>
          </td>
        </tr>`;
      phonesTable.innerHTML += row;
    });
  }
  
  function addPhone() {
    const model = document.getElementById('model').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
  
    rpcCall('addPhone', { model, brand, price })
    .then(response => {
      const { message, imei } = response;
      alert(`${message} IMEI: ${imei}`);
      document.getElementById('model').value = '';
      document.getElementById('brand').value = '';
      document.getElementById('price').value = '';
      getAllPhones(); // Refresh the list after adding a phone
    })
    .catch(error => {
      console.error('Error adding phone:', error);
    });
  }
  
  
  function updatePhone(imei, model, brand, price) {
    rpcCall('updatePhone', { imei, model, brand, price })
    .then(() => {
      getAllPhones(); // Refresh the list after updating a phone
    })
    .catch(error => {
      console.error('Error updating phone:', error);
    });
  }
  
  function deletePhone(imei) {
    if (confirm(`Are you sure you want to delete the phone with IMEI ${imei}?`)) {
      rpcCall('deletePhone', { imei })
      .then(() => {
        getAllPhones(); // Refresh the list after deleting a phone
      })
      .catch(error => {
        console.error('Error deleting phone:', error);
      });
    }
  }
  
  function savePhone(imei, button) {
    const row = button.parentNode.parentNode;
    const modelInput = row.querySelector('.model-input');
    const brandInput = row.querySelector('.brand-input');
    const priceInput = row.querySelector('.price-input');
  
    const updatedModel = modelInput.value;
    const updatedBrand = brandInput.value;
    const updatedPrice = priceInput.value;
  
    updatePhone(imei, updatedModel, updatedBrand, updatedPrice);
  }
  
  function showAdminView() {
    document.getElementById('admin-view').classList.remove('hidden');
    document.getElementById('client-view').classList.add('hidden');
  }
  