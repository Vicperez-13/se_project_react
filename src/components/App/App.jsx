import { useEffect, useState } from "react";
import { Route, HashRouter, Routes } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import {
  signIn,
  signUp,
  checkToken,
  updateProfile,
} from "../../../middlewares/auth";
import CurrentUserContext from "../../context/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: "...", C: "..." },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const item = { name, imageUrl, weather };
    console.log("Sending item data:", item);
    addItem(item)
      .then((response) => {
        const updatedItem = response.data || response;
        setClothingItems((prevItems) => {
          const newItems = [updatedItem, ...prevItems];
          return newItems;
        });
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleRegisterModalSubmit = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then((data) => {
        console.log("Registration successful:", data);
        localStorage.setItem("jwt", data.token);
        const user = data.user || data;
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleLoginModalSubmit = ({ email, password }) => {
    signIn(email, password)
      .then((data) => {
        console.log("Login successful:", data);
        localStorage.setItem("jwt", data.token);
        const user = data.user || data;
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    updateProfile({ name, avatar })
      .then((user) => {
        console.log("Profile updated successfully:", user);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data && data.length > 0 ? data : defaultClothingItems);
      })
      .catch((err) => {
        console.error("Error fetching items, using default items:", err);
        setClothingItems(defaultClothingItems);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onRegisterClick={handleRegisterClick}
                onLoginClick={handleLoginClick}
                onLogout={handleLogout}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        weatherData={weatherData}
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onEditProfile={handleEditProfileClick}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <RegisterModal
              onClose={closeActiveModal}
              isOpen={activeModal === "register"}
              onRegisterModalSubmit={handleRegisterModalSubmit}
              onLoginClick={handleLoginClick}
            />
            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login"}
              onLoginModalSubmit={handleLoginModalSubmit}
              onSignUpClick={handleRegisterClick}
            />
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteItem}
            />
            <EditProfileModal
              onClose={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onEditProfile={handleEditProfileModalSubmit}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </HashRouter>
  );
}

export default App;
