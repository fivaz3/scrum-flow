// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
//
// export default function FullCalendarApp() {
//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       headerToolbar={{
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay',
//       }}
//       initialView="timeGridWeek"
//       slotMinTime="09:00:00"
//       slotMaxTime="18:00:00"
//       hiddenDays={[0, 6]}
//       events={[
//         {
//           title: 'Employee A - Morning Work',
//           start: '2023-09-07T09:00:00',
//           end: '2023-09-07T12:00:00',
//         },
//         {
//           title: 'Employee A - Afternoon Work',
//           start: '2023-09-07T13:00:00',
//           end: '2023-09-07T18:00:00',
//         },
//         {
//           title: 'Employee A - Morning Work',
//           start: '2023-09-08T09:00:00',
//           end: '2023-09-08T12:00:00',
//         },
//         {
//           title: 'Employee A - Afternoon Work',
//           start: '2023-09-08T13:00:00',
//           end: '2023-09-08T18:00:00',
//         },
//         {
//           title: 'Employee A - Morning Work',
//           start: '2023-09-11T09:00:00',
//           end: '2023-09-11T12:00:00',
//         },
//         {
//           title: 'Employee A - Afternoon Work',
//           start: '2023-09-11T13:00:00',
//           end: '2023-09-11T18:00:00',
//         },
//         {
//           title: 'Employee B - Morning Work',
//           start: '2023-09-13T09:00:00',
//           end: '2023-09-13T12:00',
//         },
//         {
//           title: 'Employee B - Afternoon Work',
//           start: '2023-09-13T13:00:00',
//           end: '2023-09-13T18:00:00',
//         },
//         {
//           title: 'Employee B - Morning Work',
//           start: '2023-09-14T09:00:00',
//           end: '2023-09-14T12:00:00',
//         },
//         {
//           title: 'Employee B - Afternoon Work',
//           start: '2023-09-14T13:00:00',
//           end: '2023-09-14T18:00:00',
//         },
//         {
//           title: 'Employee B - Morning Work',
//           start: '2023-09-15T09:00:00',
//           end: '2023-09-15T12:00:00',
//         },
//         {
//           title: 'Employee B - Afternoon Work',
//           start: '2023-09-15T13:00:00',
//           end: '2023-09-15T18:00:00',
//         },
//       ]}
//     />
//   );
// }

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

export default function FullCalendarApp() {
  const [events, setEvents] = useState<any>([]);

  const handleEventAdd = async (addInfo: any) => {
    console.log('handleEventAdd', addInfo.event.toPlainObject());
    // // Send a request to your server to add the new event to your database
    // // You can access the new event's data using addInfo.event.toPlainObject()
    // const response = await fetch('/api/events', {
    //   method: 'POST',
    //   body: JSON.stringify(addInfo.event.toPlainObject()),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await response.json();
    // // Update the event's id with the id returned from the server
    // addInfo.event.setProp('id', data.id);
  };

  const handleEventChange = async (changeInfo: any) => {
    console.log('handleEventChange', changeInfo.event.toPlainObject());
    // Send a request to your server to update the changed event in your database
    // You can access the changed event's data using changeInfo.event.toPlainObject()
    // await fetch(`/api/events/${changeInfo.event.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(changeInfo.event.toPlainObject()),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  };

  const handleEventRemove = async (removeInfo: any) => {
    console.log('handleEventRemove', removeInfo.event.id);
    // Send a request to your server to remove the event from your database
    // await fetch(`/api/events/${removeInfo.event.id}`, {
    //   method: 'DELETE',
    // });
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const isRecurring = window.confirm('Do you want this event to repeat weekly?');
      const newEvent: any = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      if (isRecurring) {
        newEvent.rrule = {
          freq: 'weekly',
          interval: 1,
          dtstart: selectInfo.startStr,
        };
        const endRecurrence = prompt('Enter the end date for the recurrence (YYYY-MM-DD)');
        if (endRecurrence) {
          newEvent.rrule.until = endRecurrence;
        }
      }
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      setEvents(events.filter((event: any) => event.id !== clickInfo.event.id));
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="timeGridWeek"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={events}
      eventAdd={(data) => {
        console.log('data', data);
        handleEventAdd(data);
      }}
      eventChange={handleEventChange}
      eventRemove={handleEventRemove}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      select={handleDateSelect}
    />
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}
