import React, { useState } from 'react';
import { Schedule } from '@/components/Calendar/schedule.service';
import ScheduleForm from '@/components/ScheduleForm';
import Modal from '@/components/Modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

type Employee = {
  id: string;
  name: string;
};

type SingleScheduleA = {
  id: string;
  title: string;
  start: string;
  end: string;
};

type RecurringScheduleB = {
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

  async function handleAddOrEditSchedule(data: Schedule) {
    if (selectedSchedule) {
      await handleEditSchedule(data);
    } else {
      await handleAddSchedule(data);
    }
  }

  async function handleAddSchedule(data: any) {
    setSchedules((schedules) => [
      ...schedules,
      {
        id: Math.random().toString(),
        daysOfWeek: data.daysOfWeek,
        isRecurring: data.isRecurring,
        employeeId: data.employeeId,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    ]);
    setShowDialog(false);
    setSelectedSchedule(null);
  }

  async function handleEditSchedule(data: any) {
    if (selectedSchedule) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === selectedSchedule.id
            ? {
                ...schedule,
                employeeId: data.employeeId,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                recurring: data.recurring,
                endDate: data.endDate,
                daysOfWeek: data.daysOfWeek,
              }
            : schedule
        )
      );
      setShowDialog(false);
      setSelectedSchedule(null);
    }
  }

  async function handleDeleteSchedule() {
    if (selectedSchedule) {
      setSchedules(schedules.filter((schedule) => schedule.id !== selectedSchedule.id));
      setShowDialog(false);
      setSelectedSchedule(null);
    }
  }

  const handleEventClick = (info: any) => {
    const schedule = schedules.find((schedule) => schedule.id === info.event.id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setShowDialog(true);
    }
  };

  const formatSchedules = () => {
    return schedules
      .filter((schedule) => selectedEmployeeIds.includes(schedule.employeeId))
      .map((schedule) => {
        if (schedule.isRecurring) {
          const formattedSchedule: RecurringScheduleB = {
            id: schedule.id,
            title: employees.find((employee) => employee.id === schedule.employeeId)?.name || '',
            daysOfWeek: schedule.daysOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            startRecur: schedule.startDate,
            endRecur: schedule.endDate,
          };
          return formattedSchedule;
        } else {
          const formattedSchedule: SingleScheduleA = {
            id: schedule.id,
            title: employees.find((employee) => employee.id === schedule.employeeId)?.name || '',
            start: schedule.startDate + 'T' + schedule.startTime.padStart(2, '0') + ':00',
            end: schedule.endDate + 'T' + schedule.endTime.padStart(2, '0') + ':00',
          };
          return formattedSchedule;
        }
      });
  };

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
            events={formatSchedules()}
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
