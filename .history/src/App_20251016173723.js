import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ar";

import SplitButton from "./components/SplitButton";
import Cairo from "./cities/Cairo";
import BahariyaOasis from "./cities/BahariyaOasis";
import SouthSinaiDahab from "./cities/SouthSinaiDahab";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  const [selectedCity, setSelectedCity] = useState("Cairo");

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  const handleLangChange = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
    setLang(newLang);
  };

  // 🖼️ تحديد الخلفية حسب المدينة
  const backgroundImages = {
    Cairo: "url('/images/cairo-bg.webp')",
    BahariyaOasis: "url('/images/bahariya-bg.webp')",
    "South Sinai - Dahab": "url('/images/dahab-bg.webp')",
  };

  const currentBackground =
    backgroundImages[selectedCity] || "url('/images/default-bg.webp')";

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), ${currentBackground}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-image 0.5s ease-in-out", // انتقال ناعم للخلفية
        }}
      >
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
          <SplitButton onSelectCity={setSelectedCity} />

          <div style={{ marginTop: "5%" }}>
            {selectedCity === "Cairo" && <Cairo lang={lang} />}
            {selectedCity === "BahariyaOasis" && <BahariyaOasis lang={lang} />}
            {selectedCity === "South Sinai - Dahab" && (
              <SouthSinaiDahab lang={lang} />
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleLangChange} style={{ color: "white" }}>
              {lang === "ar" ? "English" : "العربية"}
            </Button>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
