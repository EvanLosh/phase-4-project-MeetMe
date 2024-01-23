import React, { useEffect, useState } from "react";
import "./Header.css"


function Header() {
    return <div id="header">
        <h1 id="site-title">MeetMe</h1>
        <div id="header-stuff">

            <p>Select user</p>
            <p><a href="/new-user">Create user</a></p>
        </div>
    </div>;
}

export default Header;
