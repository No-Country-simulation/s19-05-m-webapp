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
const shoppingService = {
  patchShopping,
};

export default shoppingService;
