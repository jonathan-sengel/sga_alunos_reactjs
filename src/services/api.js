export const apiGet = async (endpoint) => {
  return await fetch(endpoint).then((response) => response.json());
};

export const apiPost = async (endpoint, body) => {
  console.log(endpoint, body);
  return fetch(endpoint, {
    method: "POST",
    body: body,
  });
};
