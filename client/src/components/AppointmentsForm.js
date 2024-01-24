import React, { useEffect, useState } from "react";
import CreateAppointment from "./CreateAppointment";
import ViewAppointment from "./ViewAppointment";
import ModifyAppointment from "./ModifyAppointment";
import "./AppointmentsForm.css"
import { useParams } from "react-router-dom"


function chooseForm(child, id = -1) {
    if (child === "view") {
        return <ViewAppointment id={id} />
    }
    else if (child === "modify") {
        return <ModifyAppointment id={id} />
    }
    else {
        return <CreateAppointment />
    }
}




function AppointmentsForm() {
    const { child, id } = useParams()

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
