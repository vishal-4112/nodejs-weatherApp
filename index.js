import express from "express";
import cookieParser from "express";
import axios from "axios";
import path from "path";
const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  res.render("home");
});

app.post("/", async (req, res) => {
  const { cityName } = req.body;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=ffe5a72c68e10a2ad9bbd3160031bc20&units=metric";

  const data = axios
    .get(url)
    .then((weatherData) => {
      const icon = weatherData.data.weather[0].icon;
      const temp = weatherData.data.main.temp;
      const description = weatherData.data.weather[0].description;
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const country = weatherData.data.sys.country;
      const feelsLike = weatherData.data.main.feels_like;
      const windSpeed = weatherData.data.wind.speed;
      const pressure = weatherData.data.main.pressure;
      const humidity = weatherData.data.main.humidity;
      res.render("result", {
        imageurl: imgurl,
        temperature: temp,
        feelsLike: feelsLike,
        windSpeed: windSpeed,
        pressure: pressure,
        humidity: humidity,
        description: description,
        cityName: cityName,
        country: country,
      });
    })
    .catch((err) => console.log(err));
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
