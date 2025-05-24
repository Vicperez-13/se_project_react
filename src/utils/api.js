const baseUrl = "http://localhost:3001";

export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error adding item:", err);
      return Promise.reject(err);
    });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error adding item:", err);
      return Promise.reject(err);
    });
}

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error adding item:", err);
      return Promise.reject(err);
    });
}

export { getItems };
