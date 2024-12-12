import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const patchShopping = async (userId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/shopping/${userId}`);
    return response.data.data;
  } catch {
    throw new Error("No se pudo actualizar el historial.");
  }
};

const getShopping = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shopping/user/${userId}`);
    return response.data.data;
  } catch {
    throw new Error("No se pudo obtener el historial.");
  }
};

const postShopping = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/shopping`, {
      user_id: userId,
      products_id: productId,
      quantity: quantity,
    });
    return response.data.data;
  } catch {
    throw new Error("No se pudo agregar al historial.");
  }
};

const deleteShopping = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/shopping/${userId}/${productId}`
    );
    return response.data;
  } catch {
    throw new Error("No se pudo eliminar el historial.");
  }
};

const updateShopping = async (userId, productId, quantity) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/shopping/${userId}/${productId}`,
      {
        quantity: quantity,
      }
    );
    return response.data.data;
  } catch {
    throw new Error("No se pudo actualizar el historial.");
  }
};

const shoppingService = {
  patchShopping,
  getShopping,
  postShopping,
  deleteShopping,
  updateShopping,
};

export default shoppingService;
