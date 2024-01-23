import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Switch, Route, useParams } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm"
import "./App.css"
import Header from "./Header";
import CreateAppointment from "./CreateAppointment";
import AppointmentsForm from "./AppointmentsForm";
import ViewAppointment from "./ViewAppointment";
import ModifyAppointment from "./ModifyAppointment";
import Footer from "./Footer";

const router = createBrowserRouter([
  {

    path: "/",
    // Props to Home get passed here
    element: <Home />,
    children:
      [{
        path: "",
        element: (<AppointmentsForm />),
      },
      {
        path: ":child/:id",
        element: (<AppointmentsForm />),
      },
      {
        /* modify appointment */
      }
      ]
  },
  {
    path: "/new-user",
    // Props to NewUserForm get passed here
    element: <NewUserForm />
  }
])



function App() {
  return <div id="app">
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </div>;
}

export default App;
