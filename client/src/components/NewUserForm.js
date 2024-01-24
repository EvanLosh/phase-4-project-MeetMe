import React, { useEffect, useState } from "react";
import "./NewUserForm.css"

const blankForm = {
    username: ''
}


function NewUserForm() {
    const [formData, setFormData] = useState(blankForm)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    {/* on submit, post a new user to /users with formData.username. Update users state in App.js. */ }


    return <div id="new-user-form">
        <p>New user form</p>
        <form>
            <label for="fname">Username:</label>
            <input type="text" id="fname" name="username" onChange={handleInputChange}></input>
            <input type="submit" value="Submit"></input>
        </form>
    </div>;
}

export default NewUserForm;
