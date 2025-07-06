import { useContext } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  weatherData,
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = (item) => {
    onCardClick(item);
  };

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p>Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
