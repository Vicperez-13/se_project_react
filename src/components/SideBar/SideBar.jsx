import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="SideBar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
