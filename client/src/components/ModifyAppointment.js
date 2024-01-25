import React from 'react';
import { useFormik } from 'formik';

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

function ModifyAppointment({ id, appointment, attendees, jsonifyAttendeesString }) {

    const formik = useFormik({
        initialValues: blankForm,
        onSubmit: values => {
            fetch(`http://localhost:5000/appointments/${id}`, {  // Replace with our actual API endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });

    return (
        <div id="modify-appointment">
            <p>modify appointment. id = {id}.</p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formik.values.title} onChange={formik.handleChange} />
                <br />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} />
                <br />
                <p>Location: {appointment.location}</p>
                <p>Starts: {appointment.start}</p>
                <p>End: {appointment.end}</p>
                <p>Appointment status:</p>
                <input type="radio" id="active" name="status" value="Active" onChange={formik.handleChange} />
                <label htmlFor="active">Active</label>
                <input type="radio" id="canceled" name="status" value="Canceled" onChange={formik.handleChange} />
                <label htmlFor="canceled">Canceled</label>
                <input type="radio" id="rescheduled" name="status" value="Rescheduled" onChange={formik.handleChange} />
                <label htmlFor="rescheduled">Rescheduled</label>
                <br />
                <p>Your status:</p>
                <input type="radio" id="going" name="attendingStatus" value="Going" onChange={formik.handleChange} />
                <label htmlFor="going">Going</label>
                <input type="radio" id="not-going" name="attendingStatus" value="Not going" onChange={formik.handleChange} />
                <label htmlFor="not-going">Not going</label>
                <br />
                <label htmlFor="additionalAttendees">Invite additional users (usernames separated by commas):</label>
                <input type="text" id="additionalAttendees" name="additionalAttendees" value={formik.values.additionalAttendees} onChange={formik.handleChange} />
                <br />
                <input type="submit" value="Update appointment" />
            </form>
        </div>
    );
}

export default ModifyAppointment;