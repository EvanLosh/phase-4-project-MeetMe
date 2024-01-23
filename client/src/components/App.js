import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm"
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    // Props to Home get passed here
    element: <Home />
  },
  {
    path: "/new-user",
    // Props to NewUserForm get passed here
    element: <NewUserForm />
  }
])

function App() {
  return <div className="calendar-container">
    <RouterProvider router={router} />
  </div>;
}

export default App;
