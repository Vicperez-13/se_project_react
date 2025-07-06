import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginModalSubmit,
  onSignUpClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ email, password });
    setEmail("");
    setPassword("");
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login"
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal_type_login"
      customButtons={
        <div className="modal__button-group">
          <button type="submit" className="modal__submit">
            Login
          </button>
          <button
            type="button"
            className="modal__signup-btn"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email@gmail.com"
          required
          minLength="3"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
