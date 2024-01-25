import React, { useEffect, useState } from "react";
import CreateAppointment from "./CreateAppointment";
import ViewAppointment from "./ViewAppointment";
import ModifyAppointment from "./ModifyAppointment";
import "./AppointmentsForm.css";
import { useParams } from "react-router-dom";

const blankAppointment = {
    title: '',
    start: '',
    end: '',
    description: '',
    owner: '',
    location: '',
    status: 'Active',
    attendances: [
        {
            username: '',
            status: ''
        }
    ]
};

function stringifyattendancesJSON(list) {
    let stringify = '';
    for (let i = 0; i < list.length; i++) {
        if (i === (list.length - 1)) {
            stringify = stringify + list[i].username;
        } else {
            stringify = stringify + list[i].username + ", ";
        }
    }
    return stringify;
}

function jsonifyattendancesString(string) {
    let attendances = [];
    let stringList = string.split(", ");
    for (let i = 0; i < stringList.length; i++) {
        attendances.push({ username: stringList[i], status: 'Unconfirmed' });
    }
    return attendances;
}

function AppointmentsForm({ appointments, serverURL }) {
    const { child, id } = useParams();
    const [appointment, setAppointment] = useState(blankAppointment);
    useEffect(() => {
        if ((id > 0)) {
            fetch(`${serverURL}/appointments/${id}`)
                .then(r => r.json())
                .then(r => setAppointment(r))
        }
    }, [])

    const submitAppointment = async (method) => {
        const requestOptions = {
            method: method.toUpperCase(),
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify(appointment),
        };
        // Fetch logic here using requestOptions
    };

    return (
        <div id="appointments-form">
            <p>appointments form</p>
            <div id="appointment-form-options">
                <a href="/">Create</a>
                <a href={"/view/" + id}>View</a>
                <a href={"/modify/" + id}>Modify</a>
            </div>
            {child === "view" && <ViewAppointment id={id} appointment={appointment} stringifyattendancesJSON={stringifyattendancesJSON} />}
            {child === "modify" && <ModifyAppointment id={id} appointment={appointment} jsonifyattendancesString={jsonifyattendancesString} />}
            {child !== "view" && child !== "modify" && <CreateAppointment jsonifyattendancesString={jsonifyattendancesString} />}
            <button onClick={() => submitAppointment('post')}>Create Appointment</button>
            <button onClick={() => submitAppointment('patch')}>Update Appointment</button>
            <button onClick={() => submitAppointment('delete')}>Delete Appointment</button>
        </div>
    );
}

export default AppointmentsForm;
