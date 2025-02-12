import axios from "axios";
// const API_URL = "https://airbox-asessment-server.vercel.app";
const API_BASE_URL = "https://airbox-asessment-server.vercel.app/api"; 
// Set up Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set Authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Example: Fetch all bookings
export const getBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data || error);
    throw error;
  }
};

// Example: Fetch dashboard metrics
export const getDashboardMetrics = async () => {
  try {
    const response = await api.get("/dashboard/metrics");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error.response?.data || error);
    throw error;
  }
};

export default api;
