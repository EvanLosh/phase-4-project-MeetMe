import React from 'react';
import { useFormik } from 'formik';

const CreateAppointment = ({ jsonifyattendancesString, serverURL }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            location: '',
            description: '',
            start_time: '',
            end: '',
            attendancesString: ''
        },
        onSubmit: values => {
            values.owner_id = //current user id
            values.attendances = jsonifyattendancesString(values.attendancesString);
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
                <label htmlFor="start">Datetime start:</label>
                <input type="text" id="start" name="start" value={formik.values.start} onChange={formik.handleChange} />
                <br />
                <label htmlFor="end">Datetime end:</label>
                <input type="text" id="end" name="end" value={formik.values.end} onChange={formik.handleChange} />
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
