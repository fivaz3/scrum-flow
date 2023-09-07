import { useForm } from 'react-hook-form';
import { Schedule } from '@/components/Calendar/schedule.service';
import React, { useEffect } from 'react';
import { Employee } from '@/components/DevList';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

export interface ScheduleFormProps {
  employees: Employee[];
  selectedSchedule: Schedule | null;
  onSubmit: (_data: Schedule) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function ScheduleForm({
  employees,
  selectedSchedule,
  onSubmit,
  onDelete,
}: ScheduleFormProps) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dateErrorMessage = 'Invalid time format. Expected format is YYYY-MM-DD';
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const timeErrorMessage = 'Invalid time format. Expected format is hh:mm';

  const schema = z.object({
    startDate: z.string().regex(dateRegex, dateErrorMessage),
    endDate: z.string().regex(dateRegex, dateErrorMessage),
    startTime: z.string().regex(timeRegex, timeErrorMessage),
    endTime: z.string().regex(timeRegex, timeErrorMessage),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Schedule>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: employees[0].id,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      isRecurring: false,
      daysOfWeek: [],
    },
  });

  useEffect(() => {
    if (!watch('isRecurring')) {
      setValue('endDate', watch('startDate'));
    }
  }, [setValue, watch]);

  async function submitThenReset(data: Schedule) {
    console.log('submitThenReset');
    await onSubmit(data);
    reset();
  }

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <form onSubmit={handleSubmit(submitThenReset)} className="bg-white p-4 rounded">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Add Schedule</h3>
        <div>
          {JSON.stringify(errors, null, 2)}
          <label>
            Employee:
            <select {...register('employeeId')}>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Date:
            <input type="date" {...register('startDate')} />
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </label>
          <br />
          <label>
            Start Time:
            <input type="time" {...register('startTime')} />
            {errors.startTime && <p>{errors.startTime.message}</p>}
          </label>
          <br />
          <label>
            End Time:
            <input type="time" {...register('endTime')} />
            {errors.endTime && <p>{errors.endTime.message}</p>}
          </label>
          <br />
          <label>
            Recurring:
            <input type="checkbox" {...register('isRecurring')} />
          </label>
          <div>
            {/*<div className={classNames({ hidden: !watch('isRecurring') })}>*/}
            <br />
            <label>
              End Date:
              <input type="date" {...register('endDate')} />
              {errors.endDate && <p>{errors.endDate.message}</p>}
            </label>
            <br />
            Days of Week:
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <React.Fragment key={day}>
                <input type="checkbox" value={day} defaultChecked {...register('daysOfWeek')} />
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]}
              </React.Fragment>
            ))}
            {errors.daysOfWeek && <p>{errors.daysOfWeek.message}</p>}
          </div>
          <br />
          {selectedSchedule ? (
            <>
              <button type="submit">Edit</button>
              <button type="button" onClick={onDelete}>
                Delete
              </button>
            </>
          ) : (
            <button type="submit">Add</button>
          )}
        </div>
      </form>
    </div>
  );
}
