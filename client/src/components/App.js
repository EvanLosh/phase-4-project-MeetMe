import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Switch, Route, useParams } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm"
import "./App.css"
import Header from "./Header";
import AppointmentsForm from "./AppointmentsForm";
import Footer from "./Footer";

const serverURL = "http://127.0.0.1:5555"
const blankUser = { username: '', id: -1 }

function App() {
  const [users, setUsers] = useState([blankUser])
  const [theUser, setTheUser] = useState(blankUser)

  const router = createBrowserRouter([
    {
      path: "/",
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
      element: <NewUserForm />
    }
  ])

  function fetchUsers() {
    fetch(serverURL + "/users")
      .then(r => r.json())
      .then(r => setUsers(r))
    setTheUser(users[0])
  }

  const handleUserChange = (selectedUserId) => {
    const selectedUser = users.find(user => user.id === parseInt(selectedUserId));
    if (selectedUser) {
      setTheUser(selectedUser);
    }
  }

  useEffect(() => fetchUsers(), [])

  return <div id="app">
    <Header users={users} theUser={theUser} onUserChange={handleUserChange} />
    <RouterProvider router={router} />
    <Footer />
  </div>;
}

export default App;