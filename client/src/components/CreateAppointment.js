import React, { useEffect, useState } from "react";


function CreateAppointment() {
    return <div id="create-appointment">
        <p>Create appointment</p>
        {/* a form to post a new appointment to the db */}
        <form action="/action_page.php">
            <label for="fname">Title:</label>
            <input type="text" id="fname" name="fname" value="John"></input>
            <br></br>
            <label for="lname">Description:</label>
            <input type="text" id="lname" name="lname" value="Doe"></input>
            <br></br>
            <label for="lname">Location:</label>
            <input type="text" id="lname" name="lname" value="Doe"></input>
            <br></br>
            <label for="lname">Datetime start:</label>
            <input type="text" id="lname" name="lname" value="Doe"></input>
            <br></br>
            <label for="lname">Datetime end:</label>
            <input type="text" id="lname" name="lname" value="Doe"></input>
            <br></br>
            <label for="lname">Invite users (usernames separated by commas):</label>
            <input type="text" id="lname" name="lname" value="Doe"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
    </div>;
}

export default CreateAppointment;
