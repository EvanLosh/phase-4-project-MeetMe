import React, { useEffect, useState } from "react";


function ModifyAppointment({ id }) {
    return <div id="modify-appointment">
        <p>modify appointment. id = {id}.</p>
        {/* get the appointment from the server by id and patch it or delete it using form input */}
    </div>;
}

export default ModifyAppointment;
