import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ar";
import gsap from "gsap";

import SplitButton from "./components/SplitButton";
import Cairo from "./cities/Cairo";
import BahariyaOasis from "./cities/BahariyaOasis";
import SouthSinaiDahab from "./cities/SouthSinaiDahab";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});

function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  const [selectedCity, setSelectedCity] = useState("Cairo");

  const backgroundImages = {
    Cairo: "url('/images/cairo-bg.webp')",
    BahariyaOasis: "url('/images/bahariya-bg.webp')",
    "South Sinai - Dahab": "url('/images/dahab-bg.webp')",
  };

  const currentBackground =
    backgroundImages[selectedCity] || "url('/images/default-bg.webp')";

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  // ✨ تأثير التلاشي والزوم عند تغيير المدينة
  useEffect(() => {
    const bg = document.querySelector(".background-layer");
    if (bg) {
      const tl = gsap.timeline();
      tl.to(bg, {
        opacity: 0.3,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          bg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), ${currentBackground}`;
        },
      }).to(bg, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [selectedCity]);

  const handleLangChange = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
    setLang(newLang);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-wrapper">
        {/* الخلفية */}
        <div
          className="background-layer"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), ${currentBackground}`,
          }}
        />

        {/* المحتوى */}
        <Container
          maxWidth="sm"
          style={{
            position: "relative",
            zIndex: 2,
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

          <div style={{ display: "flex", justifyContent: "end", marginTop: 20 }}>
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
