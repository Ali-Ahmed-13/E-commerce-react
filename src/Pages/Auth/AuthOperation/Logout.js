import { LOGOUT } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Axios } from "../../../Api/axios";
export default function Logout() {
  const cookie = Cookie();
  async function handleLogout() {
    try {
      let res = await Axios.get(`/${LOGOUT}`);
      console.log(res);
      cookie.remove("token");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
