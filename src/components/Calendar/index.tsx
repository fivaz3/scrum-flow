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

type Employee = {
  id: string;
  name: string;
};

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

const employees: Employee[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const App = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      employeeId: '1',
      startDate: '2023-09-08',
      endDate: '2023-09-08',
      startTime: '09:00',
      endTime: '12:00',
      isRecurring: false,
      daysOfWeek: [],
    },
    {
      id: '2',
      employeeId: '2',
      startDate: '2023-09-08',
      endDate: '2023-09-15',
      endTime: '12:00',
      startTime: '09:00',
      isRecurring: true,
      daysOfWeek: [1, 2, 3, 4, 5],
    },
  ]);
  const { data: session } = useSession();

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>(
    employees.map((employee) => employee.id)
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const handleEmployeeSelect = (employeeId: string) => {
    if (selectedEmployeeIds.includes(employeeId)) {
      setSelectedEmployeeIds(selectedEmployeeIds.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployeeIds([...selectedEmployeeIds, employeeId]);
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
        title: employees.find((employee) => employee.id === schedule.employeeId)?.name || '',
        start: schedule.startDate + 'T' + schedule.startTime.padStart(2, '0') + ':00',
        end: schedule.endDate + 'T' + schedule.endTime.padStart(2, '0') + ':00',
      };
    }

    function convertScheduleToRecurringEvent(schedule: Schedule): RecurringEvent {
      return {
        id: schedule.id,
        title: employees.find((employee) => employee.id === schedule.employeeId)?.name || '',
        daysOfWeek: schedule.daysOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        startRecur: schedule.startDate,
        endRecur: schedule.endDate,
      };
    }

    return schedules
      .filter((schedule) => selectedEmployeeIds.includes(schedule.employeeId))
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
            {employees.map((employee) => (
              <li key={employee.id} className="mb-2">
                <input
                  type="checkbox"
                  checked={selectedEmployeeIds.includes(employee.id)}
                  onChange={() => handleEmployeeSelect(employee.id)}
                />
                <span className="ml-2">{employee.name}</span>
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
          employees={employees}
          selectedSchedule={selectedSchedule}
          onSubmit={handleAddOrEditSchedule}
          onDelete={handleDeleteSchedule}
        />
      </Modal>
    </div>
  );
};

export default App;
