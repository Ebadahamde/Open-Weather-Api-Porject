import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTranslation } from "react-i18next";

function WeatherCard({ cityName, lat, lon, lang }) {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    tempnumper: null,
    max: null,
    min: null,
    Description: "",
    Icon: null,
  });

  useEffect(() => {
    setDateAndTime(moment().format("l"));
    moment.locale(lang === "ar" ? "ar" : "en");

    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c253a6b3b50363cf1419f3e352ce3ab`,
        { cancelToken: cancelTokenSource.token }
      )
      .then((response) => {
        const toC = (k) => Math.round(k - 273.15);
        const data = response.data;
        setTemp({
          tempnumper: toC(data.main.temp),
          max: toC(data.main.temp_max),
          min: toC(data.main.temp_min),
          Description: data.weather[0].description,
          Icon: data.weather[0].icon,
        });
      })
      .catch((error) => console.error(error));

    return () => cancelTokenSource.cancel();
  }, [lat, lon, lang]);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        width: "100%",
        background: "rgb(28 52 91 / 36%)",
        color: "white",
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between", // المسافة بين العناصر
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          style={{ fontSize: "2.5rem", marginRight: "20px", fontWeight: 600 }}
        >
          {t(cityName)}
        </Typography>
        <Typography
          variant="h5"
          style={{ fontSize: "1.5rem", marginRight: "20px" }}
        >
          {dateAndTime}
        </Typography>
      </div>

      <hr />

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h1">{temp.tempnumper}</Typography>
            {temp.Icon && (
              <img
                src={`http://openweathermap.org/img/wn/${temp.Icon}.png`}
                alt={temp.Description}
              />
            )}
          </div>

          <Typography variant="h6">{t(temp.Description)}</Typography>

          <div style={{ display: "flex", alignItems: "center" }}>
            <h5>
              {t("min")}: {temp.min}
            </h5>
            <h5 style={{ margin: "0 5px" }}>|</h5>
            <h5>
              {t("max")}: {temp.max}
            </h5>
          </div>
        </div>

        <CloudIcon style={{ fontSize: 200, color: "white" }} />
      </div>
    </div>
  );
}

export default WeatherCard;
