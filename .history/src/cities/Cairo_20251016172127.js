import WeatherCard from "../components/WeatherCard";

function Cairo({ lang }) {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/cairo-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
