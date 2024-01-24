import React, { useEffect, useState } from "react";

const blankForm = {
    title: '',
    location: '',
    description: '',
    start: '',
    end: '',
    status: '', // only if the user is the owner of the appointment
    attendingStatus: ''
}

function ModifyAppointment({ id, appointment, attendees }) {
    const [formData, setFormData] = useState(blankForm)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return <div id="modify-appointment">
        <p>modify appointment. id = {id}.</p>
        {/* get the appointment from the server by id and patch it or delete it using form input */}
        <form action="/action_page.php">
            <label for="fname">Title:</label>
            <input type="text" id="fname" name="title" value={formData.title} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Description:</label>
            <input type="text" id="lname" name="description" value={formData.description} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Location:</label>
            <input type="text" id="lname" name="location" value={formData.location} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Datetime start:</label>
            <input type="text" id="lname" name="start" value={formData.start} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Datetime end:</label>
            <input type="text" id="lname" name="end" value={formData.end} onChange={handleInputChange}></input>
            <br></br>
            {/* Replace status input with multiple choice: Active/Canceled/Rescheduled */}
            <label for="lname">Status:</label>
            <input type="text" id="lname" name="status" value={formData.status} onChange={handleInputChange}></input>
            <br></br>
            {/* Replace attendingStatus input with multiple choice: Going/Not Going/Uncomfirmed */}
            <label for="lname">attendingStatus:</label>
            <input type="text" id="lname" name="attendingStatus" value={formData.attendingStatus} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Invite additional users (usernames separated by commas):</label>
            <input type="text" id="lname" name="attendees" value={formData.attendeesString} onChange={handleInputChange}></input>
            <br></br>
            <input type="submit" value="Create appointment"></input>
        </form>
    </div>;
}

export default ModifyAppointment;
