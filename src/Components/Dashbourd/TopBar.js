import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";
import { Link } from "react-router-dom";
export default function TopBar() {
  let menu = useContext(Menu);
  let setIsOpen = menu.setIsOpen;

  let [name, setName] = useState("");

  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setName(data.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleLogout() {
    try {
      let res = await Axios.get(`/${LOGOUT}`);
      console.log(res);
      cookie.remove("token");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="topbar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor="pointer"
            icon={faBars}
          />
        </div>
        <div className="d-flex align-items-center gap-5">
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
          <Button variant="primary">
            <Link to="/" className="text-white">
              TO SHOP
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
