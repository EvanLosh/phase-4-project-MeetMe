import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Switch, Route, useParams } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm"
import "./App.css"
import Header from "./Header";
import AppointmentsForm from "./AppointmentsForm";
import Footer from "./Footer";

const serverURL = "http://127.0.0.1:5000"
const blankUser = { username: '', id: -1 }



function App() {

  const [users, setUsers] = useState([blankUser])
  const [theUser, setTheUser] = useState(blankUser)
  function addUser(user) {
    setUsers([...users, user])
  }

  const router = createBrowserRouter([
    {

      path: "/",
      // Props to Home get passed here
      element: <Home theUser={theUser} users={users} serverURL={serverURL} />,
      children: [
        {
          path: "",
          element: (<AppointmentsForm />),
        },
        {
          path: ":child/:id",
          element: (<AppointmentsForm />),
        }
      ]
    },
    {
      path: "/new-user",
      // Props to NewUserForm get passed here
      element: <NewUserForm users={users} addUser={addUser} />
    }
  ])


  function fetchUsers() {
    fetch(serverURL + "/users")
      .then(r => r.json())
      .then((r) => {
        if (r.length !== 0) {
          setUsers(r)
        }
      })

    // Which user is the current user? I have harcoded it to be the first user in the list.
    setTheUser(users[0])
  }
  useEffect(() => fetchUsers(), [])
  useEffect(() => setTheUser(users[0]), [])

  console.log(users)

  return <div id="app">
    <Header users={users} theUser={theUser} />
    <RouterProvider router={router} />
    <Footer />
  </div>;
}

export default App;
