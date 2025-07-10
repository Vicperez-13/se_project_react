import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser?.name || "User avatar"}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {getInitial(currentUser?.name)}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__logout-btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
