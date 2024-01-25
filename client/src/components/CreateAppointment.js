import React from 'react';
import { useFormik } from 'formik';

const CreateAppointment = ({ jsonifyAttendancesString, serverURL, theUser, users }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            location: '',
            description: '',
            start_time: '',
            end_time: '',
            attendancesString: ''
        },
        onSubmit: values => {
            values.owner_id = theUser.id
            values.attendances = values.attendancesString.split(', ').map((s) => {
                return { user_id: users.filter(u => u.username === s)[0].id }
            });
            console.log('Creating new appointment from form data:')
            console.log(values)
            fetch(`${serverURL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

        },
    });


    return (
        <div id="create-appointment">
            <p>Create a new appointment</p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formik.values.title} onChange={formik.handleChange} />
                <br />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} />
                <br />
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" value={formik.values.location} onChange={formik.handleChange} />
                <br />
                <label htmlFor="start_time">Datetime start:</label>
                <input type="text" id="start_time" name="start_time" value={formik.values.start_time} onChange={formik.handleChange} />
                <br />
                <label htmlFor="end_time">Datetime end:</label>
                <input type="text" id="end_time" name="end_time" value={formik.values.end_time} onChange={formik.handleChange} />
                <br />
                <label htmlFor="attendancesString">Invite users (usernames separated by commas):</label>
                <input type="text" id="attendancesString" name="attendancesString" value={formik.values.attendancesString} onChange={formik.handleChange} />
                <br />
                <input type="submit" value="Create appointment" />
            </form>
        </div>
    );
};


export default CreateAppointment;
