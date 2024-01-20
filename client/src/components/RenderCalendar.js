import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)
const myEventsList = [{
  id: 11.2,
  title: "Project Kickoff - Lou's Shoes",
  start: new Date(2015, 3, 13, 11, 30, 0),
  end: new Date(2015, 3, 13, 14, 0, 0),
}]

function RenderCalendar() {
  <div className="calendar-container">
    <p>2</p>
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
