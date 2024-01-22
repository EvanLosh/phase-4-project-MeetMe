import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./RenderCalendar.css"

const localizer = momentLocalizer(moment)
const myEventsList = [{
  id: 11.2,
  title: "Project Kickoff - Lou's Shoes",
  start: new Date(2024, 1, 13, 11, 30, 0),
  end: new Date(2024, 1, 13, 14, 0, 0),
}]

function RenderCalendar() {
  return <div className="calendar-container">
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
}

export default RenderCalendar
