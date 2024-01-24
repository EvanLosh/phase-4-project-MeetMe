import React, { useEffect, useState } from "react";
import CreateAppointment from "./CreateAppointment";
import ViewAppointment from "./ViewAppointment";
import ModifyAppointment from "./ModifyAppointment";
import "./AppointmentsForm.css"
import { useParams } from "react-router-dom"

const blankAppointment = {
    title: '',
    start: '',
    end: '',
    description: '',
    owner: '',
    location: '',
    status: 'Active',
    attendees: [
        {
            username: '',
            status: ''
        }
    ]
}


function AppointmentsForm() {
    const { child, id } = useParams()
    const [appointment, setAppointment] = useState(blankAppointment)
    {/* fetch the appointment by id from /appointments/<int:id> */ }

    const attendees = appointment.attendees.map((attendee) => {
        return <p>{attendee.username}: {attendee.status}</p>
    })
    function chooseForm(child, id = -1) {
        if (child === "view") {
            return <ViewAppointment id={id} appointment={appointment} attendees={attendees} />
        }
        else if (child === "modify") {
            return <ModifyAppointment id={id} appointment={appointment} attendees={attendees} />
        }
        else {
            return <CreateAppointment />
        }
    }

    return <div id="appointments-form">
        <p>appointments form</p>
        <div id="appointment-form-options">
            <a href="/">Create</a>
            <a href={"/view/" + id}>View</a>
            <a href={"/modify/" + id}>Modify</a>
        </div>
        {chooseForm(child, id)}
    </div>;
}

export default AppointmentsForm;
