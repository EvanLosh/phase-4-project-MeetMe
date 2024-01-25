import React, { useEffect, useState } from "react";

const blankForm = {
    title: '',
    location: '',
    description: '',
    start: '',
    end: '',
    attendeesString: ''
}


function CreateAppointment({ jsonifyAttendeesString, submitAppointment }) {
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
        submitAppointment(appointment)
    }

    return <div id="create-appointment">
        <p>Create appointment</p>
        {/* a form to post a new appointment to the db */}
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Title:</label>
            <input type="text" id="fname" name="title" value={formData.title} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Description:</label>
            <input type="text" id="lname" name="description" value={formData.description} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Location:</label>
            <input type="text" id="lname" name="location" value={formData.location} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Datetime start:</label>
            <input type="text" id="lname" name="start" value={formData.start} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Datetime end:</label>
            <input type="text" id="lname" name="end" value={formData.end} onChange={handleInputChange}></input>
            <br></br>
            <label htmlFor="lname">Invite users (usernames separated by commas):</label>
            <input type="text" id="lname" name="attendees" value={formData.attendeesString} onChange={handleInputChange}></input>
            <br></br>
            <input type="submit" value="Create appointment" ></input>
        </form>
    </div>;
}

export default CreateAppointment;
