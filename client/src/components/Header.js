import React, { useEffect, useState } from "react";
import "./Header.css"


function Header({ users, theUser }) {
    if (theUser.username.length < 1) {
        theUser.username = "None"
    }

    return <div id="header">
        <h1 id="site-title"><a href="/">MeetMe</a></h1>
        <div id="header-stuff">
            <p>Current user: {theUser.username}</p>
            <p>Change user{/* make a drop down list of all usernames */}</p>
            <a href="/new-user">Create new user</a>
        </div>
    </div>;
}

export default Header;
