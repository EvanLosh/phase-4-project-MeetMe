import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./RenderCalendar.css"


// console.log(moment())
// console.log(moment().toDate())

const localizer = momentLocalizer(moment)
const blankEvent = {
  start: moment().toDate(),
  end: moment()
    .add(1, "days")
    .toDate(),
  title: "Some title",
  id: 1,
  desc: 'description'
}

function RenderCalendar({ userAppointments }) {

  let calendarEvents = userAppointments.map((a) => {
    return {
      start: a.start_time,
      end: a.end_time,
      title: a.title,
      id: a.id,
      desc: a.description
    }
  })

  if (calendarEvents.length === 0) {
    calendarEvents = [blankEvent]
  }


  return <div className="calendar-container">
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
}

export default RenderCalendar
