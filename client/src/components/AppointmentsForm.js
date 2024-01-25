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

function stringifyAttendeesJSON(list) {
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
    let attendees = []
    let stringList = string.split(", ")
    for (let i = 0; i < stringList.length; i++) {
        attendees.push({ username: stringList[i], status: 'Uncomfirmed' })
    }
    return attendees
}



function AppointmentsForm({ appointments, theUser, serverURL, addAppointment }) {

    const { child, id } = useParams()
    // const [appointment, setAppointment] = useState(blankAppointment)
    // { fetch the appointment by id from /appointments/<int:id>  }

    // const attendees = appointment.attendees.map((attendee) => {
    //     return <p key={attendee.username}>{attendee.username}: {attendee.status}</p>
    // })

    // const submitAppointment = async (method) => {
    //     const requestOptions = {
    //         method: method.toUpperCase(),
    //         headers: {
    //             'Accept': 'application/json',
    //             // Add any other headers needed?
    //         },
    //         body: formData,
    //     };
    // }

    function chooseForm(child, id = -1) {

        let appointment = appointments.filter((a) => { return a.id === id })[0]
        if (!appointment) {
            appointment = blankAppointment
        }
        const userIsOwner = (theUser.id === appointment.owner_id)


        // One of the following components gets rendered

        if (child === "view") {
            return <ViewAppointment id={id} appointment={appointment} stringifyAttendeesJSON={stringifyAttendeesJSON} />
        }
        else if (child === "modify") {

            return <ModifyAppointment appointment={appointment} jsonifyAttendeesString={jsonifyAttendeesString} userIsOwner={userIsOwner} />

        }
        else {
            return <CreateAppointment jsonifyAttendeesString={jsonifyAttendeesString} addAppointment={addAppointment} />
        }

    }

    return <div id="appointments-form">
        <div id="appointment-form-options">
            <a href="/">Create</a>
            <a href={"/view/" + id}>View</a>
            <a href={"/modify/" + id}>Modify</a>

        </div>
        {chooseForm(child, id)}
    </div>

}

export default AppointmentsForm;
