export const get = async (endpoint) => {
  return await fetch(endpoint).then((response) => response.json());
};

export const post = async (endpoint, body) => {
  return await fetch(endpoint, {
    method: "POST",
    body: body,
  });
};

export const del = async (endpoint) => {
  return await fetch(endpoint, { method: "DELETE" }).then((response) => response.json());
};
