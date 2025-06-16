import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireBack() {
  let cookie = Cookie();
  let token = cookie.get("token");

  return token ? window.history.back() : <Outlet />;
}
