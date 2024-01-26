import React, { useEffect, useState } from "react";
import "./Header.css"


function Header({ users, theUser, onUserChange }) {
    if (theUser.username.length < 1) {
        theUser.username = "None"
    }


    const handleSelectChange = (event) => {
        onUserChange(event.target.value);
    }

    return <div id="header">
        <h1 id="site-title"><a href="/">MeetMe</a></h1>
        <div id="header-stuff">
            <p>Current user: {theUser.username}</p>
            <p>Change user
                <select onChange={handleSelectChange}>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </p>
            <a href="/new-user">Create new user</a>
        </div>
    </div>;
}

export default Header;