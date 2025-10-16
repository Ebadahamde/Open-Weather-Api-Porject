import WeatherCard from "../components/WeatherCard";

function BahariyaOasis({ lang }) {
  return (
    <div
      style={{
        backgroundImage: "url('/images/bahariya-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WeatherCard
        cityName="Bahariya Oasis"
        lat="28.3500"
        lon="28.8667"
        lang={lang}
      />
    </div>
  );
}

export default BahariyaOasis;
