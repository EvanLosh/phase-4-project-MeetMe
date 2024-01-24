import React from 'react';
import { useFormik } from 'formik';

function NewUserForm() {
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        onSubmit: values => {
            fetch('http://127.0.0.1:5555/users', {
                method: 'POST',
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
        <div id="new-user-form">
            <p>New user form</p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewUserForm;