import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function apiRequest(path, { method = "GET", body, headers = {}, accessToken } = {}) {
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
      validateStatus: () => true,
    });

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }

    const error = new Error(res.data?.error || res.statusText || "Request failed");
    error.status = res.status;
    throw error;
  } catch (err) {
    if (err.response) {
      const error = new Error(err.response.data?.error || err.message || "Request failed");
      error.status = err.response.status;
      throw error;
    }
    throw err;
  }
}
