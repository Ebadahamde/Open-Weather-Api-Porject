import WeatherCard from "../components/WeatherCard";

function SouthSinaiDahab({ lang }) {
  return (
    <div
      style={{
        backgroundImage: "url('/images/dahab-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WeatherCard
        cityName="South Sinai - Dahab"
        lat="28.4933"
        lon="34.5136"
        lang={lang}
      />
    </div>
  );
}

export default SouthSinaiDahab;
