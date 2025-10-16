import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ar";

// استدعاء المدن
import Cairo from "./cities/Cairo";
import Alexandria from "./cities/Alexandria";
import Giza from "./cities/Giza";

// استدعاء الزرار الجديد
import SplitButton from "./components/SplitButton";

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        
        {/* زرار المدن */}
        <SplitButton onSelectCity={setSelectedCity} />

        {/* عرض المدينة حسب الاختيار */}
        <div style={{ marginTop: "40px" }}>
          {selectedCity === "Cairo" && <Cairo lang={lang} />}
          {selectedCity === "Alexandria" && <Alexandria lang={lang} />}
          {selectedCity === "Giza" && <Giza lang={lang} />}
        </div>

        {/* زرار اللغة */}
        <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <Button onClick={handleLangChange} style={{ color: "white" }}>
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
