import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css"


function Home({ theUser }) {
    return <div id="home">
        <RenderCalendar theUser={theUser} />
        <AppointmentsForm theUser={theUser} />
    </div>;
}

export default Home;
