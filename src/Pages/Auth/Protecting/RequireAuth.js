import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/axios";
import Err403 from "../Errors/403";
export default function RequireAuth({ allowedRole }) {
  // user
  let [user, setuser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setuser(data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      });
  }, []);
  // Token & Cookie
  let cookie = Cookie();
  let token = cookie.get("token");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
