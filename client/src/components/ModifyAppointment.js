import React, { useEffect, useState } from "react";


function ModifyAppointment({ id, appointment, attendees }) {
    return <div id="modify-appointment">
        <p>modify appointment. id = {id}.</p>
        {/* get the appointment from the server by id and patch it or delete it using form input */}
        <p>{appointment.title}</p>
        <p>Owner: {appointment.owner}</p>
        <p>Begins: {appointment.start}</p>
        <p>Ends: {appointment.end}</p>
        <p>Location: {appointment.location}</p>
        <p>Status: {appointment.status}</p>
        <p>Description: {appointment.description}</p>
        <p>Attendees:</p>
        {attendees}
    </div>;
}

export default ModifyAppointment;
