import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { useContext, useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { links } from "./NavLinks";

export default function SideBar() {
  let menu = useContext(Menu);
  let windowContext = useContext(WindowSize);
  let windowSize = windowContext.windowSize;
  let isOpen = menu.isOpen;

  let [user, setuser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setuser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          zIndex: "1",
          backgroundColor: "rgba(0,0,0,0.3)",
          transition: "0.3s",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="sidebar"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : "0",
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "static",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 sidebar-link p-2 "
              >
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 8px",
                  }}
                  icon={link.icon}
                />
                <span style={{ display: isOpen ? "block" : "none" }}>
                  {link.name}
                </span>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
