export const apiGet = async (endpoint) => {
  return await fetch(endpoint).then((response) => response.json());
};

export const apiPost = async (endpoint, body) => {
  return await fetch(endpoint, {
    method: "POST",
    body: body,
  });
};

export const apiDelete = async (endpoint) => {
  return await fetch(endpoint, { method: "DELETE" }).then((response) => response.json());
};
