import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import "./App.css";

const API_KEY = "b29d3706fedf840cf7809726b1a0c804";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var temp_date = Math.round(data.main.temp) + "°";

      var date = new Date(data.sys.sunset * 1000);
      var hours = date.getHours(); // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      var sunset_date = hours + ":" + minutes.substr(-2);

      var pressure_value = Math.round(data.main.pressure / 1.333) + " мм.рт.ст.";

      this.setState({
        temp: temp_date,
        city: data.name,
        country: data.sys.country,
        pressure: pressure_value,
        sunset: sunset_date,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введіть назву міста!",
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather temp={this.state.temp} city={this.state.city} country={this.state.country} pressure={this.state.pressure} sunset={this.state.sunset} error={this.state.error} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
