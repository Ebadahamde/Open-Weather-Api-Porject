import React from "react";
import WeatherCard from "../components/WeatherCard";

function Alexandria({ lang }) {
  return (
    <WeatherCard
      cityName="Cairo"
      lat="30.0444"
      lon="31.2357"
      lang={lang}
    />
  );
}

export default Cairo;
