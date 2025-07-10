import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
