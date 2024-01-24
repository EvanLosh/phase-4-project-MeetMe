import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css"

function Home() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('/appointments/user_id')  // Replace 'user_id' with the actual user ID
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error:', error));
    }, []);  // The empty array means this effect runs once when the component mounts

    return (
        <div id="home">
            <RenderCalendar appointments={appointments} />
            <AppointmentsForm />
        </div>
    );
}

export default Home;