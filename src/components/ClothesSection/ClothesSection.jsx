import ItemCard from "../../components/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  weatherData,
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  const handleCardClick = (item) => {
    onCardClick(item);
  };

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
        {clothingItems
          // .filter((item) => {
          //   return item.weather === weatherData.type;
          // })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // pass as prop
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
