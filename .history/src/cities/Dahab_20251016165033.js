import React from "react";
import WeatherCard from "../components/WeatherCard";

function SouthSinaiDahab({ lang }) {
  return (
    <WeatherCard
      cityName="South Sinai - Dahab"
      lat="28.4933"
      lon="34.5136"
      lang={lang}
    />
  );
}

export default Dahab;
