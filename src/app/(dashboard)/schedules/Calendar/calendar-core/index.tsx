import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import FullCalendar from '@fullcalendar/react';
import React, { Dispatch, SetStateAction } from 'react';
import { Schedule } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { EventClickArg } from '@fullcalendar/core';
import { Member } from '@/app/(dashboard)/schedules/calendar/member.service';

export type SingleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export type RecurringEvent = {
  id: string;
  title: string;
  duration: string;
  rrule: {
    freq: string;
    byweekday: string[];
    dtstart: string;
    until: string;
  };
};

export type Event = SingleEvent | RecurringEvent;

function convertScheduleToEvent(
  schedules: Schedule[],
  members: Member[],
  selectedMemberIds: string[]
): Event[] {
  const selectedSchedules = schedules.filter((schedule) =>
    selectedMemberIds.includes(schedule.memberId)
  );

  return selectedSchedules.map((schedule) => {
    const member = members.find((member) => member.accountId === schedule.memberId);
    return {
      ...schedule,
      title: member?.displayName || 'member supprimé',
    };
  });
}

function handleEventClick(
  info: EventClickArg,
  schedules: Schedule[],
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>,
  setShowDialog: Dispatch<SetStateAction<boolean>>
) {
  const schedule = schedules.find((schedule) => schedule.id.toString() === info.event.id);
  if (schedule) {
    setSelectedSchedule(schedule);
    setShowDialog(true);
  }
}

interface CalendarCoreProps {
  schedules: Schedule[];
  members: Member[];
  selectedMemberIds: string[];
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function CalendarCore({
  schedules,
  members,
  selectedMemberIds,
  setSelectedSchedule,
  setShowDialog,
}: CalendarCoreProps) {
  return (
    <FullCalendar
      // timeZone="UTC"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={convertScheduleToEvent(schedules, members, selectedMemberIds)}
      eventClick={(info) => handleEventClick(info, schedules, setSelectedSchedule, setShowDialog)}
    />
  );
}
