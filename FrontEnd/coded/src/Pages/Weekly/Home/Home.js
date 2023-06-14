import React, { Component } from "react";
import NavbarWeekly from "../../../Component/Navbar/NavbarWeekly/NavbarWeekly";
import WeeklyDate from "./Component/WeeklyDate/WeeklyDate";
import WeatherCodi from "./Component/WeatherCodi/WeatherCodi";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <>
        <NavbarWeekly />
        <div className="mainContainer">
          <WeeklyDate />
          <WeatherCodi />
        </div>
      </>
    );
  }
}

export default Home;
