import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="Sidebar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
