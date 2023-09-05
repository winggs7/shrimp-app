import React, { useEffect, useState } from "react";
import { WeatherApi } from "../../Apis/weather";
import moment from "moment";

export default function Weather() {
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [isRainy, setIsRainy] = useState<boolean>(false);
  const currentDate = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const weather = await WeatherApi.getWeather(
        position.coords.latitude,
        position.coords.longitude
      );
      const rainy = weather.hourly?.weathercode?.some(
        (wmoCode: number) => wmoCode > 50
      );

      setIsRainy(rainy);
      setCurrentWeather(weather?.current_weather);
    });
  }, []);

  return (
    <div className="rightside-container weather">
      <div className="rightside__title">Weather</div>
      <div className="rightside__content">
        <div className="date">
          {weekday[currentDate.getDay()]}, {moment().format("DD MMMM, YYYY")}
        </div>
        <div className="weather">
          Rain forecast today: <strong>{isRainy ? "Yes" : "No"}</strong>
        </div>
        <div className="temperature">
          Temperature: <strong>{currentWeather?.temperature}</strong>
        </div>
      </div>
    </div>
  );
}
