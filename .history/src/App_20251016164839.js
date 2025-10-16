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
// import Giza from "./cities/Giza";

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
        <SplitButton onSelectCity={setSelectedCity} />

        <div style={{ marginTop: "5%" }}>
          {selectedCity === "Cairo" && <Cairo lang={lang} />},
          {selectedCity === "BahariyaOasis" && <BahariyaOasis lang={lang} />}
          {selectedCity === "South Sinai - Dahab" && <Dahab lang={lang} />}
        </div>

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
        >
          <Button onClick={handleLangChange} style={{ color: "white" }}>
            {lang === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
