import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm";
import "./App.css";
import Header from "./Header";
import AppointmentsForm from "./AppointmentsForm";
import Footer from "./Footer";

const serverURL = "http://127.0.0.1:5000";
const blankUser = { username: '', id: -1 };

function App() {
  const [users, setUsers] = useState([blankUser]);
  const [theUser, setTheUser] = useState(blankUser);

  function addUser(user) {
    setUsers([...users, user]);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home theUser={theUser} users={users} serverURL={serverURL} />,
      children: [
        {
          path: "",
          element: <AppointmentsForm />,
        },
        {
          path: ":child/:id",
          element: <AppointmentsForm />,
        },
      ],
    },
    {
      path: "/new-user",
      element: <NewUserForm users={users} addUser={addUser} />,
    },
  ]);

  function fetchUsers() {
    fetch(serverURL + "/users")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }
  

  const handleUserChange = (selectedUserId) => {
    const selectedUser = users.find(user => user.id === parseInt(selectedUserId));
    if (selectedUser) {
      setTheUser(selectedUser);
    }
  }

  useEffect(fetchUsers, []); // Run once on component mount

  console.log(users);

  return (
    <div id="app">
      <Header users={users} theUser={theUser} onUserChange={handleUserChange} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;