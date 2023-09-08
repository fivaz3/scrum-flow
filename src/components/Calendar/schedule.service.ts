export type Schedule = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  isRecurring: boolean;
};
