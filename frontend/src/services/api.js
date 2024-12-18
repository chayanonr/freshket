import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const calculateOrder = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/calculate`, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
