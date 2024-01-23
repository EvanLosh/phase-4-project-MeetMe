import React, { useEffect, useState } from "react";
import CreateAppointment from "./CreateAppointment";
import ViewAppointment from "./ViewAppointment";
import ModifyAppointment from "./ModifyAppointment";
import "./AppointmentsForm.css"


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


function AppointmentsForm({ child, id }) {
    return <div id="appointments-form">
        <p>appointments form</p>
        {chooseForm(child, id)}
    </div>;
}

export default AppointmentsForm;
