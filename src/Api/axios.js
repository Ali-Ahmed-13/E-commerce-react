import axios from "axios";
import { baseURL } from "./Api";
import Cookie from "cookie-universal";
let cookie = Cookie();
let token = cookie.get("token")
export let Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + token,
  },
});
