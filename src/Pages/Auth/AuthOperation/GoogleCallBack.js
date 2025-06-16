import axios from "axios";
import { useEffect } from "react";
import { baseURL, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
export default function GoogleCallBack() {
  let cookie = Cookie();
  let location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        let res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        );
        console.log(res);
        const token = res.data.access_token;
        cookie.set("token", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <h1>Test</h1>;
}
