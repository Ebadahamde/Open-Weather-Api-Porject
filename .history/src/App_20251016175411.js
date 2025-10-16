import { useState, useEffect } from "react";
// ... باقي الـ imports

function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [bgStyle, setBgStyle] = useState({
    backgroundImage: "url('/images/cairo-bg.webp')",
    opacity: 1,
  });

  // 🖼️ تحديد الخلفيات حسب المدينة
  const backgroundImages = {
    Cairo: "url('/images/cairo-bg.webp')",
    BahariyaOasis: "url('/images/bahariya-bg.webp')",
    "South Sinai - Dahab": "url('/images/dahab-bg.webp')",
  };

  useEffect(() => {
    // ↓ تخفي الخلفية الحالية بالتدريج
    setBgStyle((prev) => ({ ...prev, opacity: 0 }));

    // ↓ بعد نصف ثانية غيّر الخلفية واظهرها تاني
    const timeout = setTimeout(() => {
      setBgStyle({
        backgroundImage:
          backgroundImages[selectedCity] ||
          "url('/images/default-bg.webp')",
        opacity: 1,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedCity]);

  // 🔤 تغيير اللغة
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

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          ...bgStyle,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          transition: "opacity 1s ease-in-out", // ✨ هنا السحر
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
            style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
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
