import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
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
  const [fadeIn, setFadeIn] = useState(true);
  const isFirstLoad = useRef(false); // 🟡 لتجاهل التأثير أول مرة فقط

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  useEffect(() => {
    // 🟢 لو دي أول مرة الصفحة تفتح، متعملش تأثير
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // 🟢 غير الخلفية مع تأثير التلاشي عند تبديل المدينة
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, [selectedCity]);

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
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* خلفية متغيرة بتأثير fade فقط عند التبديل */}
        <div
          key={selectedCity}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), ${currentBackground}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            inset: 0,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
          }}
        />

        {/* المحتوى */}
        <Container
          maxWidth="sm"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "white",
          }}
        >
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
