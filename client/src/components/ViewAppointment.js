import React, { useEffect, useState } from "react";



function ViewAppointment({ id }) {
    return <div id="view-appointment">
        <p>View appointment. id = {id}.</p>
        {/* get the appointment from the server by id and show the details here */}
    </div>;
}

export default ViewAppointment;
