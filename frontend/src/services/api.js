import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-customer-support-system-g60u.onrender.com/api",
});

export default API;