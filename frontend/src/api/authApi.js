import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {

  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensure cookies are included if needed
    });

        // ✅ Store token & user ID in localStorage
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", user?._id); // Ensure you save user ID for bookings
        }
    
    console.log('login successfuls')
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("userId"));
    return response.data;
   
  } catch (error) {
    console.error("API Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userData) => {

  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("API Registration error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
