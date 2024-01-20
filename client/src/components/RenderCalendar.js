import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./RenderCalendar.css"


// console.log(moment())
// console.log(moment().toDate())

const localizer = momentLocalizer(moment)
const myEventsList = [{
  start: moment().toDate(),
  end: moment()
    .add(1, "days")
    .toDate(),
  title: "Some title",
  id: 1,
  desc: 'description'
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
