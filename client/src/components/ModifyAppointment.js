import React, { useEffect, useState } from "react";

const blankForm = {
    title: '',
    location: '',
    description: '',
    start: '',
    end: '',
    status: '', // only if the user is the owner of the appointment
    attendingStatus: '',
    additionalAttendees: ''
}

function ModifyAppointment({ id, appointment, attendees, jsonifyAttendeesString }) {
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
            {/* Location, start, and end should not be modifiable

            <label for="lname">Location:</label>
            <input type="text" id="lname" name="location" value={formData.location} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Datetime start:</label>
            <input type="text" id="lname" name="start" value={formData.start} onChange={handleInputChange}></input>
            <br></br>
            <label for="lname">Datetime end:</label>
            <input type="text" id="lname" name="end" value={formData.end} onChange={handleInputChange}></input>
            <br></br> 
            */}
            {/* Replace status input with multiple choice: Active/Canceled/Rescheduled 
            <label for="lname">Status:</label>
            <input type="text" id="lname" name="status" value={formData.status} onChange={handleInputChange}></input>
            <br></br>
            */}


            <p>Appointment status:</p>
            <input type="radio" id="active" name="status" value="Active"></input>
            <label for="active">Active</label>
            <input type="radio" id="canceled" name="status" value="Canceled"></input>
            <label for="canceled">Canceled</label>
            <input type="radio" id="rescheduled" name="status" value="Rescheduled"></input>
            <label for="rescheduled">Rescheduled</label>
            <br></br>



            {/* Replace attendingStatus input with multiple choice: Going/Not Going/Uncomfirmed 
            <label for="lname">attendingStatus:</label>
            <input type="text" id="lname" name="attendingStatus" value={formData.attendingStatus} onChange={handleInputChange}></input>
            <br></br>
            */}

            <p>Your status:</p>
            <input type="radio" id="going" name="attendingStatus" value="Going"></input>
            <label for="going">Going</label>
            <input type="radio" id="not-going" name="AttendingStatus" value="Not going"></input>
            <label for="not-going">Not going</label>
            <br></br>







            <label for="lname">Invite additional users (usernames separated by commas):</label>
            <input type="text" id="lname" name="additionalAttendees" value={formData.additionalAttendees} onChange={handleInputChange}></input>
            <br></br>
            <input type="submit" value="Update appointment"></input>
        </form>
    </div>;
}

export default ModifyAppointment;
