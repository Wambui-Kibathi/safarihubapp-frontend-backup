import axios from "axios";

const API_URL = "http://127.0.0.1:5000/destinations";

export const getAllDestinations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};
