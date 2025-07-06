import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  onLogout,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="wtwr logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__right-group">
          <div className="header__actions">
            <ToggleSwitch />
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleAddClick}
                  type="button"
                  className="header__add-clothes-btn"
                >
                  + Add Clothes
                </button>
                <button
                  onClick={onLogout}
                  type="button"
                  className="header__logout-btn"
                >
                  Log Out
                </button>
              </>
            ) : null}
          </div>

          {isLoggedIn ? (
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser?.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {getInitial(currentUser?.name)}
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <div className="header__auth-buttons">
              <button
                type="button"
                className="header__register-btn"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login-btn"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
