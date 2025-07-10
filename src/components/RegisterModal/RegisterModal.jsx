import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegisterModalSubmit,
  onLoginClick,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, email, password, avatar });
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal_type_register"
      customButtons={
        <div className="modal__button-group">
          <button type="submit" className="modal__submit">
            Sign Up
          </button>
          <button
            type="button"
            className="modal__login-btn"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      }
    >
      <label htmlFor="register-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input modal__input_type_card_name"
          id="register-avatar"
          placeholder="ImageUrl"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email@gmail.com"
          required
          minLength="3"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
