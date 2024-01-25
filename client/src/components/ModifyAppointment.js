import React, { useEffect, useState } from "react";

const blankForm = {
    title: '',
    location: '',
    description: '',
    start: '',
    end: '',
    attendeesString: '',
    status: '', // modifiable only if the user is the owner of the appointment
    attendingStatus: '',
    additionalAttendees: ''
}

function ModifyAppointment({ id, appointment, fetchAppointment, jsonifyAttendeesString }) {
    const [formData, setFormData] = useState(blankForm)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const appointment = { ...formData, attendees: jsonifyAttendeesString(formData.attendeesString) }
        console.log(`creating appointment from form data: ${appointment}`)
        fetchAppointment(appointment)
    }

    return <div id="modify-appointment">
        <p>modify appointment. id = {id}.</p>
        {/* get the appointment from the server by id and patch it or delete it using form input */}
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Title:</label>
            <input type="text" id="fname" name="title" value={formData.title} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Description:</label>
            <input type="text" id="lname" name="description" value={formData.description} onChange={handleInputChange}></input>
            <br></br>

            <p>Location: {appointment.location}</p>
            <p>Starts: {appointment.start}</p>
            <p>End: {appointment.end}</p>

            {/* Location, start, and end should probably not be modifiable

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

            <p>Appointment status:</p>
            <input type="radio" id="active" name="status" value="Active" onChange={handleInputChange}></input>
            <label htmlFor="active">Active</label>
            <input type="radio" id="canceled" name="status" value="Canceled" onChange={handleInputChange}></input>
            <label htmlFor="canceled">Canceled</label>
            <input type="radio" id="rescheduled" name="status" value="Rescheduled" onChange={handleInputChange}></input>
            <label htmlFor="rescheduled">Rescheduled</label>
            <br></br>

            <p>Your status:</p>
            <input type="radio" id="going" name="attendingStatus" value="Going" onChange={handleInputChange}></input>
            <label htmlFor="going">Going</label>
            <input type="radio" id="not-going" name="attendingStatus" value="Not going" onChange={handleInputChange}></input>
            <label htmlFor="not-going">Not going</label>
            <br></br>

            <label htmlFor="lname">Invite additional users (usernames separated by commas):</label>
            <input type="text" id="lname" name="attendeesString" value={formData.attendeesString} onChange={handleInputChange}></input>
            <br></br>
            <input type="submit" value="Update appointment"></input>
        </form>
    </div>;
}

export default ModifyAppointment;
