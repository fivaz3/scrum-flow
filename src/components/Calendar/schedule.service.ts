export type Schedule = (RecurringSchedule | SingleSchedule) & {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

type SingleSchedule = {
  isRecurring: false;
  daysOfWeek: never[];
};

type RecurringSchedule = {
  isRecurring: true;
  daysOfWeek: number[];
};
