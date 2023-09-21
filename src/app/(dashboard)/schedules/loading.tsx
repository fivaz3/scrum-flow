'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react';
import MembersList from '@/app/(dashboard)/schedules/members-list';

export default function ScheduleSkeleton() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <MembersList
          members={[]}
          selectedMemberIds={[]}
          openForm={() => {}}
          handleMemberSelect={() => {}}
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
          events={() => {}}
          eventClick={() => {}}
        />
      </div>
    </div>
  );
}
