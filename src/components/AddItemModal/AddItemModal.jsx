import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New Garment"
      buttonText="Add Garment"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card_name"
          id="add-name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="add-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input modal__input_type_card_name"
          id="add-imageUrl"
          placeholder="ImageUrl"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="Modal__legend">Select the weather type:</legend>
        <span className="modal_label-container-radio">
          {" "}
          <label htmlFor="hot" className="modal__label modal_label_type_radio">
            <input
              name="Weathertemp"
              id="hot"
              type="radio"
              className="modal__radio-input "
              onChange={handleWeatherChange}
              value={"hot"}
              checked={weather === "hot"}
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label modal_label_type_radio">
            <input
              name="Weathertemp"
              id="warm"
              type="radio"
              className="modal__radio-input"
              onChange={handleWeatherChange}
              value={"warm"}
              checked={weather === "warm"}
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label modal_label_type_radio">
            <input
              name="Weathertemp"
              id="cold"
              type="radio"
              className="modal__radio-input"
              onChange={handleWeatherChange}
              value={"cold"}
              checked={weather === "cold"}
            />
            Cold
          </label>
        </span>
      </fieldset>
    </ModalWithForm>
  );
}
