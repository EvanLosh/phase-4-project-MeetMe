import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
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

function stringifyAttendeesJSON(list) {
    // Convert a JSON list of attendees into a string of usernames
    let stringify = ''
    for (let i = 0; i < list.length; i++) {
        if (i === (list.length - 1)) {
            stringify = stringify + list[i].username
        }
        else {
            stringify = stringify + list[i].username + ", "
        }
    }
    return stringify
}

function jsonifyAttendeesString(string) {
    // Convert a string of usernames into a JSON list of attendees
    let attendees = []
    let stringList = string.split(", ")
    for (let i = 0; i < stringList.length; i++) {
        attendees.push({ username: stringList[i], status: 'Uncomfirmed' })
    }
    return attendees
}


function AppointmentsForm() {
    const { child, id } = useParams()
    const [appointment, setAppointment] = useState(blankAppointment)

    const attendees = appointment.attendees.map((attendee) => {
        return <p key={attendee.username}>{attendee.username}: {attendee.status}</p>
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            start: '',
            end: '',
            description: '',
            owner: '',
            location: '',
            status: 'Active',
            attendees: '',
        },
        onSubmit: values => {
            values.attendees = jsonifyAttendeesString(values.attendees);
            // handle submission
        },
    });


    function chooseForm(child, id = -1) {
        let appointment = appointments.filter((a) => { return a.id === id })[0]
        if (!appointment) {
            appointment = blankAppointment
        }
        if (child === "view") {
            return <ViewAppointment appointment={appointment} stringifyAttendeesJSON={stringifyAttendeesJSON} />
        }
        else if (child === "modify") {
            return <ModifyAppointment appointment={appointment} jsonifyAttendeesString={jsonifyAttendeesString} fetchAppointment={fetchAppointment} />
        }
        else {
            return <CreateAppointment jsonifyAttendeesString={jsonifyAttendeesString} fetchAppointment={fetchAppointment} />
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