import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.png";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const imageUrl = card.imageUrl || card.link;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        >
          <img src={closeIcon} alt="close modal" />
        </button>
        <img src={imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwn && (
            <button
              className="modal__delete-btn"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
