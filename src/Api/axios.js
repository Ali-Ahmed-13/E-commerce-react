// src/Axios.js
import axios from "axios";
import { baseURL } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("token");

console.log("Base URL:", baseURL);
console.log("Token:", token);

export const Axios = axios.create({
  baseURL: baseURL,
  headers: token ? { Authorization: `Bearer ${token}` } : {}, // لو مفيش توكن مش هنبعت Authorization header
});
