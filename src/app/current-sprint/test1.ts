import { differenceInMinutes, eachDayOfInterval, getDay, isWithinInterval, set } from 'date-fns';
import { IssueWithChangeLog } from '@/lib/issue.service';
import { Schedule } from '@/app/settings/Calendar/schedule.service';

const taskStartString = '2023-09-05T12:06:47.779+0200';
const taskEndString = '2023-09-07T12:16:20.264+0200';

const workingSchedules: WorkingSchedule[] = [
  {
    id: '3',
    memberId: '1000',
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    startTime: '09:00',
    endTime: '12:00',
    isRecurring: true,
    daysOfWeek: [1, 2, 3, 4, 5],
  },
  {
    id: '4',
    memberId: '1000',
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    startTime: '13:00',
    endTime: '18:00',
    isRecurring: true,
    daysOfWeek: [1, 2, 3, 4, 5],
  },
];

export function main() {
  console.log('test', calculateWorkTime(workingSchedules, taskStartString, taskEndString));

  function calculateWorkTime(
    workingSchedules: WorkingSchedule[],
    taskStartedAt: string,
    taskEndedAt: string
  ): number {
    let totalMinutes = 0;

    eachDayOfInterval({ start: new Date(taskStartedAt), end: new Date(taskEndedAt) }).forEach(
      (day) => {
        workingSchedules.forEach((schedule) => {
          if (
            isWithinInterval(day, {
              start: new Date(schedule.startDate),
              end: new Date(schedule.endDate),
            }) &&
            schedule.daysOfWeek.includes(getDay(day))
          ) {
            const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
            const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
            const startOfWork = set(day, { hours: startHour, minutes: startMinute });
            const endOfWork = set(day, { hours: endHour, minutes: endMinute });
            const startOfTask = new Date(taskStartedAt);
            const endOfTask = new Date(taskEndedAt);

            if (day.setHours(0, 0, 0, 0) === new Date(taskStartedAt).setHours(0, 0, 0, 0)) {
              console.log('first day');
              if (startOfTask < endOfWork) {
                const diff = differenceInMinutes(
                  Math.min(endOfWork.getTime(), endOfTask.getTime()),
                  Math.max(startOfWork.getTime(), startOfTask.getTime())
                );
                console.log('diff', diff / 60);
                totalMinutes += diff;
              }
            } else if (day.setHours(0, 0, 0, 0) === new Date(taskEndedAt).setHours(0, 0, 0, 0)) {
              console.log('last day');
              if (endOfTask > startOfWork) {
                const diff = differenceInMinutes(
                  Math.min(endOfWork.getTime(), endOfTask.getTime()),
                  Math.max(startOfWork.getTime(), startOfTask.getTime())
                );
                console.log('diff', diff / 60);
                totalMinutes += diff;
              }
            } else {
              const diff = differenceInMinutes(endOfWork, startOfWork);
              console.log('diff', diff / 60);
              totalMinutes += diff;
            }
          }
        });
      }
    );

    return totalMinutes;
  }
}

type Issue = IssueWithChangeLog;
type WorkingSchedule = Schedule;
