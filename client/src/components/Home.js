import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";
import AppointmentsForm from "./AppointmentsForm";
import "./Home.css"


function Home() {
    return <div id="home">
        <RenderCalendar />
        <AppointmentsForm />
    </div>;
}

export default Home;
