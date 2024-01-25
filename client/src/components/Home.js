import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css";

function Home({ users, serverURL, theUser }) {
    const [appointments, setAppointments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    function addAppointment(appointment) {
        setAppointments([...appointments, appointment]);
    }

    // useEffect(() => {
    //     if (selectedUser) {
    //         fetch(`${serverURL}/appointments/${selectedUser.id}`)
    //             .then(response => response.json())
    //             .then(data => setAppointments(data))
    //             .catch(error => console.error('Error:', error));
    //     }
    // }, [selectedUser, serverURL]);

    const handleUserChange = (event) => {
        const userId = event.target.value;
        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
    };



    const updateAppointments = (newAppointments) => {
        setAppointments(newAppointments);
    };

    const getAppointment = () => {
        fetch(`${serverURL}/appointments`)
            .then(response => response.json())
            .then((a) => {
                setAppointments(a);
                console.log(a)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(getAppointment, [])

    const fetchAppointment = (appointment) => {
        if ('id' in appointment) {
            fetch(`${serverURL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            })
                .then(response => response.json())
                .then((newAppointment) => {
                    addAppointment(newAppointment);
                })
                .catch(error => console.error('Error:', error));
        } else {
            fetch(`${serverURL}/appointments/${appointment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            })
                .then(response => response.json())
                .then(updatedAppointment => {
                    const updatedAppointments = appointments.map(app =>
                        app.id === updatedAppointment.id ? updatedAppointment : app
                    );
                    updateAppointments(updatedAppointments);
                })
                .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div id="home">
            <select onChange={handleUserChange}>
                <option>Select a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <RenderCalendar appointments={appointments} />
            <AppointmentsForm
                updateAppointments={updateAppointments}
                appointments={appointments}
                fetchAppointment={fetchAppointment}
                theUser={theUser}
                serverURL={serverURL}
                addAppointment={addAppointment}
            />
        </div>
    );
}

export default Home;
