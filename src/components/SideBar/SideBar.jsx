import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          src={currentUser.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {getInitial(currentUser?.name)}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>
      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
    </div>
  );
}

export default SideBar;
