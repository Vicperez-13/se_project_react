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
import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import {
  signIn,
  signUp,
  checkToken,
  updateProfile,
} from "../../../middlewares/auth";
import CurrentUserContext from "../../context/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
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
      .then((user) => {
        console.log("Registration successful:", user);
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        localStorage.setItem("jwt", user.token);
      })
      .catch(console.error);
  };
  const handleLoginModalSubmit = ({ email, password }) => {
    signIn(email, password)
      .then((user) => {
        console.log("Login successful:", user);
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        localStorage.setItem("jwt", user.token);
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
        setClothingItems(data);
      })
      .catch(console.error);
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
        });
    }
  }, []);

  return (
    <HashRouter>
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
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                    />
                  }
                />
              </Routes>
              <Footer />
            </div>
            <RegisterModal
              onClose={closeActiveModal}
              isOpen={activeModal === "register"}
              onRegisterModalSubmit={handleRegisterModalSubmit}
            />
            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login"}
              onLoginModalSubmit={handleLoginModalSubmit}
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
