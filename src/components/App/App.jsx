import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "...", C: "..." },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        </div>
        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New Garment"
          buttonText="Add Garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="ImageUrl"
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="Modal__legend">Select the weather type:</legend>
            <span className="modal_label-container-radio">
              {" "}
              <label
                htmlFor="hot"
                className="modal__label modal_label_type_radio"
              >
                <input
                  name="Weathertemp"
                  id="hot"
                  type="radio"
                  className="modal__radio-input"
                />
                Hot
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal_label_type_radio"
              >
                <input
                  name="Weathertemp"
                  id="warm"
                  type="radio"
                  className="modal__radio-input"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal_label_type_radio"
              >
                <input
                  name="Weathertemp"
                  id="cold"
                  type="radio"
                  className="modal__radio-input"
                />
                Cold
              </label>
            </span>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
