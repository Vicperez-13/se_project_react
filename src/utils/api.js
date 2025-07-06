const baseUrl = "http://localhost:3001";

export function addItem(item) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
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
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      return Promise.reject(err);
    });
}

function getItems() {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error finding item:", err);
      return Promise.reject(err);
    });
}

export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error liking item:", err);
      return Promise.reject(err);
    });
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    })
    .catch((err) => {
      console.error("Error unliking item:", err);
      return Promise.reject(err);
    });
}

export { getItems };
