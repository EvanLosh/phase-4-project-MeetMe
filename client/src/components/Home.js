import React, { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";


function Home() {
    return <div id="home">
        <RenderCalendar />
    </div>;
}

export default Home;

// import React, { useEffect, useState } from "react";
// import RenderCalendar from "./RenderCalendar";

// function Home() {
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         fetch('api url goes here')
//             .then(response => response.json())
//             .then(data => setAppointments(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     return (
//         <div id="home">
//             <RenderCalendar appointments={appointments} />
//         </div>
//     );
// }

// export default Home;