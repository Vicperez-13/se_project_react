import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  weatherData,
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} />
      </section>
      <section className="profile__content">
        <ClothesSection
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
