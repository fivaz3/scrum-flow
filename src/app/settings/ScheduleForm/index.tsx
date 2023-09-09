import { Controller, useForm } from 'react-hook-form';
import { Schedule, ScheduleIn, ScheduleInSchema } from '@/app/settings/Calendar/schedule.service';
import React, { useEffect } from 'react';
import { Member } from '../DevList';
import { format } from 'date-fns';
import classNames from 'classnames';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ScheduleFormProps {
  members: Member[];
  selectedSchedule: Schedule | null;
  onSubmit: (_data: ScheduleIn) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function ScheduleForm({
  members,
  selectedSchedule,
  onSubmit,
  onDelete,
}: ScheduleFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ScheduleIn>({
    resolver: zodResolver(ScheduleInSchema),
    defaultValues: selectedSchedule || {
      memberId: members[0].id,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      isRecurring: false,
      daysOfWeek: [],
    },
  });

  const watchIsRecurring = watch('isRecurring');
  const watchStartDate = watch('startDate');

  useEffect(() => {
    if (!watchIsRecurring) {
      setValue('endDate', watchStartDate);
      setValue('daysOfWeek', []);
    } else {
      setValue('daysOfWeek', [1, 2, 3, 4, 5]);
    }
  }, [watchIsRecurring, watchStartDate, setValue]);

  async function submitThenReset(data: ScheduleIn) {
    // console.log('data', data);
    await onSubmit(data);
    reset();
  }

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <form onSubmit={handleSubmit(submitThenReset)} className="bg-white p-4 rounded">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Add Schedule</h3>
        <div>
          <label>
            Member:
            <select {...register('memberId')}>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
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
          <div className={classNames({ hidden: !watch('isRecurring') })}>
            <br />
            <label>
              End Date:
              <input type="date" {...register('endDate')} />
              {errors.endDate && <p>{errors.endDate.message}</p>}
            </label>
            <br />
            Days of Week:
            {['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'].map(
              (day, index) => (
                <label key={day}>
                  <Controller
                    name="daysOfWeek"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        value={index}
                        checked={value.includes(index)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            onChange([...value, index]);
                          } else {
                            onChange(value.filter((v) => v !== index));
                          }
                        }}
                      />
                    )}
                  />
                  {day}
                </label>
              )
            )}
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
