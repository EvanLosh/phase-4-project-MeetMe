import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css";

function Home({ users, serverURL, theUser }) {
    const [appointments, setAppointments] = useState([]);
    let userAppointments = appointments.filter((a) => { return a.attendances.map((a) => { return a.user_id }).includes(theUser.id) })
    console.log(userAppointments)

    function addAppointment(appointment) {
        setAppointments([...appointments, appointment]);
    }

    const updateAppointments = (newAppointments) => {
        setAppointments(newAppointments);
    };

    const getAppointments = () => {
        fetch(`${serverURL}/appointments`)
            .then(response => response.json())
            .then((a) => {
                setAppointments(a);
                console.log(a)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(getAppointments, [])

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
            <RenderCalendar userAppointments={userAppointments} />
            <AppointmentsForm
                updateAppointments={updateAppointments}
                appointments={appointments}
                fetchAppointment={fetchAppointment}
                theUser={theUser}
                serverURL={serverURL}
                addAppointment={addAppointment}
                users={users}
            />
        </div>
    );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import RenderCalendar from "./RenderCalendar";

// function Home() {
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         fetch('api url goes here')
//             .then(response => response.json())
//             .then(data => setAppointments(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     return (
//         <div id="home">
//             <RenderCalendar appointments={appointments} />
//         </div>
//     );
// }

// export default Home;