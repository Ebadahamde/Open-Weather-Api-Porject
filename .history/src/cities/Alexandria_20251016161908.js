import React from "react";
import WeatherCard from "../components/WeatherCard";

function Alexandria({ lang }) {
  return (
    <WeatherCard
      cityName="Alexandria"
      lat="31.2156"
      lon="29.9553"
      lang={lang}
    />
  );
}

export default Alexandria;

}

export default Cairo;
