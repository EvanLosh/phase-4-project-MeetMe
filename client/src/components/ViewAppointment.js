import React, { useEffect, useState } from "react";



function ViewAppointment({ id, appointment, stringifyAttendeesJSON }) {

    let attendees = stringifyAttendeesJSON(appointment.attendees)


    // function fetchAppointment(id) {
    //     const url = `http://127.0.0.1:5555/appointments/<int:${id}>`
    //     fetch(url)
    //         .then(r => r.json())
    //         .then(data => setAppointment(data))
    // }

    // fetchAppointment(id)




    return <div id="view-appointment">
        {/* get the appointment from the server by id and show the details here */}
        <p>View appointment. id = {id}.</p>
        <p><a href={`/modify/${id}`}>Modify this appointment</a></p>
        <p>{appointment.title}</p>
        <p>Owner: {appointment.owner}</p>
        <p>Starts: {appointment.start}</p>
        <p>Ends: {appointment.end}</p>
        <p>Location: {appointment.location}</p>
        <p>Status: {appointment.status}</p>
        <p>Description: {appointment.description}</p>
        <p>Attendees: {attendees}</p>
    </div>;
}

export default ViewAppointment;
