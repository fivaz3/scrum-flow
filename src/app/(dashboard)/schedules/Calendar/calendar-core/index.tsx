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
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
};

function convertScheduleToEvent(
  schedules: Schedule[],
  members: Member[],
  selectedMemberIds: string[]
) {
  function convertScheduleToSingleEvent(schedule: Schedule, members: Member[]): SingleEvent {
    const member = members.find((member) => member.accountId === schedule.memberId);
    return {
      id: schedule.id,
      title: member?.displayName || 'member supprimé',
      start: new Date(`${schedule.startDate}T${schedule.startTime}`).toISOString(),
      end: new Date(`${schedule.endDate}T${schedule.endTime}`).toISOString(),
    };
  }

  function convertScheduleToRecurringEvent(schedule: Schedule, members: Member[]): RecurringEvent {
    const member = members.find((member) => member.accountId === schedule.memberId);
    return {
      id: schedule.id,
      title: member?.displayName || 'member supprimé',
      daysOfWeek: schedule.daysOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      startRecur: schedule.startDate,
      endRecur: schedule.endDate,
    };
  }

  const selectedSchedules = schedules.filter((schedule) =>
    selectedMemberIds.includes(schedule.memberId)
  );

  return selectedSchedules.map((schedule) => {
    if (schedule.isRecurring) {
      return convertScheduleToRecurringEvent(schedule, members);
    } else {
      return convertScheduleToSingleEvent(schedule, members);
    }
  });
}

function handleEventClick(
  info: EventClickArg,
  schedules: Schedule[],
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>,
  setShowDialog: Dispatch<SetStateAction<boolean>>
) {
  const schedule = schedules.find((schedule) => schedule.id === info.event.id);
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
  console.log(members);
  return (
    <FullCalendar
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
