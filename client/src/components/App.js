import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import RenderCalendar from "./RenderCalendar";
import Home from "./Home";
import "./App.css"

function App() {
  return <div className="calendar-container">
    <p>1</p>
    <Home />
    <RenderCalendar />
  </div>;
}

export default App;
