import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import RenderCalendar from "./RenderCalendar";

function App() {
  return <div className="calendar-container">
    <p>1</p>
    <RenderCalendar />
  </div>;
}

export default App;
