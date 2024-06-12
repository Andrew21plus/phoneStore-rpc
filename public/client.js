function populateClientTable(data) {
    const clientPhonesTable = document.getElementById('client-phones-table');
    clientPhonesTable.innerHTML = '';
    data.forEach(phone => {
      const row = `
        <tr>
          <td>${phone.imei}</td>
          <td>${phone.model}</td>
          <td>${phone.brand}</td>
          <td>${phone.price}</td>
          <td>
            <button onclick="buyPhone('${phone.imei}')">Buy</button>
          </td>
        </tr>`;
      clientPhonesTable.innerHTML += row;
    });
  }
  
  function buyPhone(imei) {
    if (confirm(`Are you sure you want to buy the phone with IMEI ${imei}?`)) {
      deletePhone(imei);
    }
  }
  
  function showClientView() {
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('client-view').classList.remove('hidden');
  }
  