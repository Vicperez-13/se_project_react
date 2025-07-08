import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, isOpen, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal_type_edit-profile"
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL *
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
