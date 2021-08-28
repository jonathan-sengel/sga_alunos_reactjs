export const apiGet = async (endpoint) => {
  return await fetch(endpoint).then((response) => response.json());
};
