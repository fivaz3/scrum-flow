'use client';
import MembersList from '@/app/(dashboard)/schedules/dev-list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react';

function doNothing() {}

export default function ScheduleLoading() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <MembersList
          members={[]}
          selectedMemberIds={[]}
          openForm={doNothing}
          handleMemberSelect={doNothing}
          loading={true}
        />
      </div>
      <div className="w-4/5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={doNothing}
          eventClick={doNothing}
        />
      </div>
    </div>
  );
}
