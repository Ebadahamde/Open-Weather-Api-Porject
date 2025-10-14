import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useEffect } from "react";
import { useState } from "react";
// i18next
import { useTranslation } from "react-i18next";

// axios
import axios from "axios";
// moment
import moment from "moment";
import "moment/locale/ar"; // without this line it didn't work

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  // i18next
  const { t, i18n } = useTranslation();

  //   state
  const [dateAndTime, setdateAndTime] = useState("");
  const [temp, setTemp] = useState({
    tempnumper: null,
    max: null,
    min: null,
    Description: "",
    Icon: null,
  });
  // useeffect
  var cancelTokem = null;
  useEffect(() => {     i18n.changeLanguage("ar");

  useEffect(() => {

    setdateAndTime(moment().format("l"));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=0c253a6b3b50363cf1419f3e352ce3ab",
        {
          cancelToken: new axios.CancelToken(function executor(c) {
            cancelTokem = c;
          }),
        }
      )
      .then((response) => {
        var tempretureIncelsius = response.data.main.temp - 273.15;
        var maxTempreture = response.data.main.temp_max - 273.15;
        var minTempreture = response.data.main.temp_min - 273.15;
        var description = response.data.weather[0].description;
        var responseIcon = response.data.weather[0].icon;
        setTemp({
          tempnumper: Math.round(tempretureIncelsius),
          max: Math.round(maxTempreture),
          min: Math.round(minTempreture),
          Description: description,
          Icon: responseIcon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    return () => {
      cancelTokem();
      console.log("canceled");
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t("cairo")}
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.tempnumper}
                      </Typography>
                      <img
                        src={`http://openweathermap.org/img/wn/${temp.Icon}.png`}
                        alt={temp.Description}
                      />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6"> {temp.Description} </Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى: {temp.min}</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>الكبرى: {temp.max}</h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button style={{ color: "white" }} variant="text">
                إنجليزي
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
