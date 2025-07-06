import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import likedHeart from "../../assets/State_Liked.svg";
import defaultHeart from "../../assets/State_Default.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const isLiked =
      item.likes &&
      currentUser &&
      item.likes.some((id) => id === currentUser._id);
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked =
    item.likes &&
    currentUser &&
    item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const imageUrl = item.imageUrl || item.link;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          >
            <img
              src={isLiked ? likedHeart : defaultHeart}
              alt={isLiked ? "Unlike" : "Like"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
