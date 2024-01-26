import React from 'react';
import { useFormik } from 'formik';

const CreateAppointment = ({ jsonifyAttendeesString, serverURL, theUser, users }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            location: '',
            description: '',
            start: '',
            end: '',
            attendancesString: ''
        },
        onSubmit: async (values) => {
            values.owner_id = theUser.id
            // values.attendances = values.attendancesString.split(', ').map((s) => {
            //     return { user_id: users.filter(u => u.username === s)[0].id }
            // });
            // handle submission
            const response = await fetch(`${serverURL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // log the response data
        },
    });

    return (
        <div id="create-appointment">
            <p>Create appointment</p>
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
                <p>Datetime Start:</p>
                <div className="datetime-form">
                    <label htmlFor="startYYYY">YYYY</label>
                    <input type="text" name="startYYYY" value={formik.values.startYYYY} onChange={formik.handleChange}></input>
                    <label htmlFor="startMM">MM</label>
                    <input type="text" name="startMM" value={formik.values.startMM} onChange={formik.handleChange}></input>
                    <label htmlFor="startDD">DD</label>
                    <input type="text" name="startDD" value={formik.values.startDD} onChange={formik.handleChange}></input>
                    <label htmlFor="starthr">hr</label>
                    <input type="text" name="starthr" value={formik.values.starthr} onChange={formik.handleChange}></input>
                    <label htmlFor="startmin">min</label>
                    <input type="text" name="startmin" value={formik.values.startmin} onChange={formik.handleChange}></input>
                </div>
                <p>Datetime End:</p>
                <div className="datetime-form">
                    <label htmlFor="endYYYY">YYYY</label>
                    <input type="text" name="endYYYY" value={formik.values.endYYYY} onChange={formik.handleChange}></input>
                    <label htmlFor="endMM">MM</label>
                    <input type="text" name="endMM" value={formik.values.endMM} onChange={formik.handleChange}></input>
                    <label htmlFor="endDD">DD</label>
                    <input type="text" name="endDD" value={formik.values.endDD} onChange={formik.handleChange}></input>
                    <label htmlFor="endhr">hr</label>
                    <input type="text" name="endhr" value={formik.values.endhr} onChange={formik.handleChange}></input>
                    <label htmlFor="endmin">min</label>
                    <input type="text" name="endmin" value={formik.values.endmin} onChange={formik.handleChange}></input>
                </div>
                <label htmlFor="attendancesString">Invite users (usernames separated by commas):</label>
                <input type="text" id="attendancesString" name="attendancesString" value={formik.values.attendancesString} onChange={formik.handleChange} />
                <br />
                <input type="submit" value="Create appointment" />
            </form>
        </div>
    );
};

export default CreateAppointment;