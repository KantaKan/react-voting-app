import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function apiRequest(path, { method = "GET", body, headers = {}, accessToken } = {}) {
  console.log(`🌐 API Request: ${method} ${path}`, { hasAccessToken: !!accessToken, hasBody: !!body });

  try {
    const res = await axios.request({
      baseURL: API_BASE,
      url: path,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      data: body,
      withCredentials: false,
      // Remove validateStatus - let axios handle errors normally
    });

    console.log(`✅ API Success: ${method} ${path} (${res.status})`);
    return res.data;
  } catch (err) {
    console.log(`❌ API Error: ${method} ${path}`, err.response?.status, err.response?.data?.error || err.message);

    // Consistent error handling
    if (err.response) {
      // Server responded with error status
      const error = new Error(err.response.data?.error || err.response.statusText || "Request failed");
      error.status = err.response.status;
      error.response = err.response;
      throw error;
    } else if (err.request) {
      // Network error - no response received
      const error = new Error("Network error - no response received");
      error.status = 0;
      throw error;
    } else {
      // Something else went wrong
      throw new Error(err.message || "Request failed");
    }
  }
}
