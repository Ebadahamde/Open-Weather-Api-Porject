import WeatherCard from "../components/WeatherCard";

function Cairo({ lang }) {
  return (
    <div
      style={{
        backgroundImage: "url('/images/cairo-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WeatherCard
        cityName="Cairo"
        lat="30.033333"
        lon="31.233334"
        lang={lang}
      />
    </div>
  );
}

export default Cairo;
