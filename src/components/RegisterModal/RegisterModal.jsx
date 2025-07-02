import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegisterModalSubmit,
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
      title="Register"
      buttonText="Register"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input modal__input_type_card_name"
          id="avatar"
          placeholder="ImageUrl"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
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
