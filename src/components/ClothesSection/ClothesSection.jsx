import ItemCard from "../Main/ItemCard/ItemCard";

function ClothesSection({ weatherData, clothingItems, onCardClick }) {
  const handleCardClick = (item) => {
    onCardClick(item);
  };

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p>your Items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
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
