import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// API Endpointes

export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

export const addTable = (data) => api.post("/api/table/", data);
export const getTables = () => api.get("/api/table");
export const createOrder = (data) => api.post("/api/payment/create_Order", data);
export const verifyOnlinePayment = (data) => api.post("/api/payment/verify_payment", data);