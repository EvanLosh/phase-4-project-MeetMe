import React, { useEffect, useState } from "react";
import "./NewUserForm.css"


function NewUserForm() {
    return <div id="new-user-form">
        <p>New user form</p>
        <form>
            <label for="fname">Username:</label>
            <input type="text" id="fname" name="fname"></input>
            <input type="submit" value="Submit"></input>
        </form>
    </div>;
}

export default NewUserForm;
