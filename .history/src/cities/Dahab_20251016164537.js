import React from "react";
import WeatherCard from "../components/WeatherCard";

function Dahab({ lang }) {
  return (
    <WeatherCard
      cityName="South Sinai - Dahab"
      lat="27.0667"
      lon="28.4667"
      lang={lang}
    />
  );
}

export default Dahab;
;

