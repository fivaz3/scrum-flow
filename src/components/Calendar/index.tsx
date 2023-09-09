'use client';
import React, { useState } from 'react';
import {
  addSchedule,
  editSchedule,
  Schedule,
  ScheduleIn,
} from '@/components/Calendar/schedule.service';
import ScheduleForm from '@/components/ScheduleForm';
import Modal from '@/components/Modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { useSession } from 'next-auth/react';
import { Member } from '@/components/DevList';

type SingleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

type RecurringEvent = {
  id: string;
  title: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
};

export interface CalendarProps {
  members: Member[];
  currentSchedules: Schedule[];
}

export default function Calendar({ members, currentSchedules }: CalendarProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '3',
      memberId: '1',
      startDate: '2023-09-08',
      endDate: '2023-09-08',
      startTime: '14:00',
      endTime: '17:00',
      isRecurring: false,
      daysOfWeek: [],
    },
  ]);
  const { data: session } = useSession();

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    members.map((member) => member.id)
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const handleMemberSelect = (memberId: string) => {
    if (selectedMemberIds.includes(memberId)) {
      setSelectedMemberIds(selectedMemberIds.filter((id) => id !== memberId));
    } else {
      setSelectedMemberIds([...selectedMemberIds, memberId]);
    }
  };

  async function handleAddOrEditSchedule(data: ScheduleIn) {
    if (!session?.access_token) {
      throw "Vous n'est pas connecté";
    }
    if (selectedSchedule) {
      await handleEditSchedule(data, selectedSchedule.id, session.access_token);
    } else {
      await handleAddSchedule(data, session.access_token);
    }
    setShowDialog(false);
    setSelectedSchedule(null);
  }

  async function handleAddSchedule(scheduleIn: ScheduleIn, accessToken: string) {
    const schedule = await addSchedule(scheduleIn, accessToken);
    console.log(schedule);
    setSchedules((previousSchedules) => [...previousSchedules, schedule]);
  }

  async function handleEditSchedule(scheduleIn: ScheduleIn, id: string, accessToken: string) {
    const editedSchedule = await editSchedule(scheduleIn, id, accessToken);
    setSchedules(
      schedules.map((schedule) => (schedule.id === editedSchedule.id ? editedSchedule : schedule))
    );
  }

  async function handleDeleteSchedule() {
    if (selectedSchedule) {
      setSchedules(schedules.filter((schedule) => schedule.id !== selectedSchedule.id));
      setShowDialog(false);
      setSelectedSchedule(null);
    }
  }

  function handleEventClick(info: EventClickArg) {
    const schedule = schedules.find((schedule) => schedule.id === info.event.id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setShowDialog(true);
    }
  }

  function convertScheduleToEvent() {
    function convertScheduleToSingleEvent(schedule: Schedule): SingleEvent {
      return {
        id: schedule.id,
        title: members.find((member) => member.id === schedule.memberId)?.name || '',
        start: schedule.startDate + 'T' + schedule.startTime.padStart(2, '0') + ':00',
        end: schedule.endDate + 'T' + schedule.endTime.padStart(2, '0') + ':00',
      };
    }

    function convertScheduleToRecurringEvent(schedule: Schedule): RecurringEvent {
      return {
        id: schedule.id,
        title: members.find((member) => member.id === schedule.memberId)?.name || '',
        daysOfWeek: schedule.daysOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        startRecur: schedule.startDate,
        endRecur: schedule.endDate,
      };
    }

    return schedules
      .filter((schedule) => selectedMemberIds.includes(schedule.memberId))
      .map((schedule) => {
        if (schedule.isRecurring) {
          return convertScheduleToRecurringEvent(schedule);
        } else {
          return convertScheduleToSingleEvent(schedule);
        }
      });
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowDialog(true)}>
            Add Schedule
          </button>
          <ul>
            {members.map((member) => (
              <li key={member.id} className="mb-2">
                <input
                  type="checkbox"
                  checked={selectedMemberIds.includes(member.id)}
                  onChange={() => handleMemberSelect(member.id)}
                />
                <span className="ml-2">{member.name}</span>
              </li>
            ))}
          </ul>
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
            events={convertScheduleToEvent()}
            eventClick={handleEventClick}
          />
        </div>
      </div>
      <Modal isOpen={showDialog} setOpen={() => setShowDialog(false)}>
        <ScheduleForm
          members={members}
          selectedSchedule={selectedSchedule}
          onSubmit={handleAddOrEditSchedule}
          onDelete={handleDeleteSchedule}
        />
      </Modal>
    </div>
  );
}
