import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css"

function Home({ users, serverURL }) {
    const [appointments, setAppointments] = useState([]);
    // const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users
    // useEffect(() => {
    //     fetch('http://localhost:5000/users')  // Replace with your actual API endpoint
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => console.error('Error:', error));
    // }, []);

    // Fetch appointments when selectedUser changes
    useEffect(() => {
        if (selectedUser) {
            fetch(`http://localhost:5000/appointments/${selectedUser.id}`)  // Replace with your actual API endpoint
                .then(response => response.json())
                .then(data => setAppointments(data))
                .catch(error => console.error('Error:', error));
        }
    }, [selectedUser]);

    const handleUserChange = (event) => {
        const userId = event.target.value;
        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
    };

    const updateAppointments = (newAppointments) => {
        setAppointments(newAppointments);
    };

    function fetchAppointment(appointment) {
        if ('id' in appointment) {
            fetch(serverURL + '/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            })
                .then(r => r.json)
                .then((r) => {
                    setAppointments(
                        [...appointments, r]
                    )
                })
        }
        else {
            fetch(serverURL + `/appointments/${appointment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            })
                .then(r => r.json)
                .then(
                // update the appointments state with the modified appointment
            )
        }
    }

    return (
        <div id="home">
            <select onChange={handleUserChange}>
                <option>Select a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <RenderCalendar appointments={appointments} />
            <AppointmentsForm updateAppointments={updateAppointments} appointments={appointments} fetchAppointment={fetchAppointment} />
        </div>
    );
}

export default Home;
