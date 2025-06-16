import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashbourd/SideBar";
import TopBar from "../../Components/Dashbourd/TopBar";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="position-relative dashboard d-flex gap-1">
      <TopBar />
      <div className="dashboard d-flex gap-1 w-100" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}