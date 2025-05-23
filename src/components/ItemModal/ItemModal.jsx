import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.png";
function ItemModal({ activeModal, onClose, card, onDelete }) {
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
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete-btn" onClick={() => onDelete(card)}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
