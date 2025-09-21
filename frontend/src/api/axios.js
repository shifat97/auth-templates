import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Attach access token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Handle expired token
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.get("/auth/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return API(original);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(err);
  }
);

export default API;
