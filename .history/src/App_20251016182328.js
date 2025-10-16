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
import gsap from "gsap";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});

function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  const [selectedCity, setSelectedCity] = useState("Cairo");
  useEffect(() => {
  // 🌀 تأثير التلاشي والظهور عند تغيير المدينة
  const bg = document.querySelector(".background-layer");

  if (bg) {
    const tl = gsap.timeline();

    // تأثير المربعات / الفيد
    tl.to(bg, {
      opacity: 0,
      duration: 1, // سرعة اختفاء الخلفية القديمة
      ease: "power2.inOut",
      onComplete: () => {
        bg.style.backgroundImage = backgroundImages[selectedCity];
      },
    }).to(bg, {
      opacity: 1,
      duration: 1, // سرعة ظهور الخلفية الجديدة
      ease: "power2.inOut",
    });
  }
}, [selectedCity]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  // 🟢 إعادة تشغيل الأنيميشن عند تغيير المدينة
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 1500); // مدة التأثير
    return () => clearTimeout(timeout);
  }, [selectedCity]);

  const handleLangChange = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
    setLang(newLang);
  };

  const backgroundImages = {
    Cairo: "url('/images/cairo-bg.webp')",
    BahariyaOasis: "url('/images/bahariya-bg.webp')",
    "South Sinai - Dahab": "url('/images/dahab-bg.webp')",
  };

  const currentBackground =
    backgroundImages[selectedCity] || "url('/images/default-bg.webp')";

  return (
    <ThemeProvider theme={theme}>
      <div className="app-wrapper">
        {/* الخلفية */}
        <div
          className="background-layer"
          style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), ${currentBackground}`,
    ... }}
        />

        {/* طبقة الأنيميشن */}
        {animate && <div className="transition-grid"></div>}

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
