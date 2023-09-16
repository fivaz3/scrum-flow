'use client';
import React, { useState } from 'react';
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  Schedule,
  ScheduleIn,
} from '@/app/(dashboard)/schedules/Calendar/schedule.service';
import ScheduleForm from '../ScheduleForm';
import Modal from '@/components/Modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import MembersList from '../DevList';
import { Member } from '@/app/(dashboard)/schedules/Calendar/member.service';

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

interface CalendarProps {
  members: Member[];
  currentSchedules: Schedule[];
  accessToken: string;
  cloudId: string;
}

export default function Calendar({
  members,
  currentSchedules,
  accessToken,
  cloudId,
}: CalendarProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(currentSchedules);

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    members.map((member) => member.accountId)
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
    if (selectedSchedule) {
      await handleEditSchedule(data, selectedSchedule.id, accessToken);
    } else {
      await handleAddSchedule(data, accessToken);
    }
    setShowDialog(false);
    setSelectedSchedule(null);
  }

  async function handleAddSchedule(scheduleIn: ScheduleIn, accessToken: string) {
    const schedule = await addSchedule(scheduleIn, accessToken, cloudId);
    setSchedules((previousSchedules) => [...previousSchedules, schedule]);
  }

  async function handleEditSchedule(scheduleIn: ScheduleIn, id: string, accessToken: string) {
    const editedSchedule = await editSchedule(scheduleIn, id, accessToken, cloudId);
    setSchedules(
      schedules.map((schedule) => (schedule.id === editedSchedule.id ? editedSchedule : schedule))
    );
  }

  async function handleDeleteSchedule() {
    if (selectedSchedule) {
      await deleteSchedule(selectedSchedule.id, accessToken, cloudId);
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
      const member = members.find((member) => member.accountId === schedule.memberId);
      return {
        id: schedule.id,
        title: member?.displayName || 'member supprimé',
        start: schedule.startDate + 'T' + schedule.startTime,
        end: schedule.endDate + 'T' + schedule.endTime,
      };
    }

    function convertScheduleToRecurringEvent(schedule: Schedule): RecurringEvent {
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
    <>
      <div className="flex">
        <div className="w-1/5">
          <MembersList
            members={members}
            selectedMemberIds={selectedMemberIds}
            openForm={() => {
              setSelectedSchedule(null);
              setShowDialog(true);
            }}
            handleMemberSelect={handleMemberSelect}
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
    </>
  );
}
