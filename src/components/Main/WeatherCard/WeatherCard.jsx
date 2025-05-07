import sunny from "../../../assets/day/clear.png";
import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      console.log("Weather Data:", weatherData),
      option.day === weatherData.isDay &&
        option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherData.option?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
