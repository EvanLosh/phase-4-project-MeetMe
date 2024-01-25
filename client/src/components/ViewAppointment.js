import React, { useEffect, useState } from "react";



function ViewAppointment({ appointment, stringifyAttendancesJSON }) {
    console.log("viewing appointment")
    console.log(appointment)

    let attendancesString = stringifyAttendancesJSON(appointment.attendances)


    // function fetchAppointment(id) {
    //     const url = `http://127.0.0.1:5555/appointments/<int:${id}>`
    //     fetch(url)
    //         .then(r => r.json())
    //         .then(data => setAppointment(data))
    // }

    // fetchAppointment(id)




    return <div id="view-appointment">
        {/* get the appointment from the server by id and show the details here */}
        <p>View appointment. id = {appointment.id}.</p>
        <p><a href={`/modify/${appointment.id}`}>Modify this appointment</a></p>
        <p>Title: {appointment.title}</p>
        <p>Owner: {appointment.owner.username}</p>
        <p>Starts: {appointment.start_time}</p>
        <p>Ends: {appointment.end_time}</p>
        <p>Location: {appointment.location}</p>
        <p>Status: {appointment.status}</p>
        <p>Description: {appointment.description}</p>
        <p>attendances (user IDs): {attendancesString}</p>
    </div>;
}

export default ViewAppointment;
