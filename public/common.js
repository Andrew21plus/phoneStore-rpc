const apiUrl = '/rpc';

function rpcCall(method, params = {}) {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ method, params })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to ${method}`);
    }
    return response.json();
  });
}

function getAllPhones() {
  rpcCall('getAllPhones')
  .then(data => {
    populateAdminTable(data);
    populateClientTable(data);
  })
  .catch(error => {
    console.error('Error fetching phones:', error);
  });
}
