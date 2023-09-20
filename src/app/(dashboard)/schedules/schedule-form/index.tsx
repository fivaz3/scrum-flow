import React from 'react';
import { Member } from '@/app/(dashboard)/schedules/calendar/member.service';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import classNames from 'classnames';
import Select from '@/components/select';
import SelectItem from '@/components/select-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schedule } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import {
  convertScheduleInToSchedule,
  convertScheduleToScheduleIn,
  ScheduleIn,
  ScheduleInSchema,
  weekDays,
} from '@/app/(dashboard)/schedules/schedule-form/service';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface ScheduleFormProps {
  members: Member[];
  selectedSchedule: Schedule | null;
  onSubmit: (_data: Omit<Schedule, 'id'>) => Promise<void>;
  onDelete: () => Promise<void>;
  isLoading: 'delete' | 'save' | null;
}

export default function ScheduleForm({
  members,
  selectedSchedule,
  onSubmit,
  onDelete,
  isLoading,
}: ScheduleFormProps) {
  const scheduleIn = convertScheduleToScheduleIn(selectedSchedule);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ScheduleIn>({
    resolver: zodResolver(ScheduleInSchema),
    defaultValues: scheduleIn || {
      memberId: members[0].accountId,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endDistance: 0,
      endTime: '',
      isRecurring: false,
      byweekday: [],
      until: '',
    },
  });
  const watchStartDate = watch('startDate');

  return (
    <form
      onSubmit={handleSubmit((scheduleIn) => onSubmit(convertScheduleInToSchedule(scheduleIn)))}
      className="w-[336px] shadow sm:rounded-md sm:overflow-hidden">
      <div className="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
        <h2 className="text-lg font-medium text-gray-900">Ajouter un plan de travail</h2>
        <Controller
          control={control}
          name="memberId"
          render={({ field: { onChange, value } }) => (
            <Select value={value} onChange={onChange} label="Membre">
              {members.map(({ accountId, displayName, avatarUrls }) => (
                <SelectItem key={accountId} value={accountId}>
                  <div className="flex items-center">
                    <img
                      src={avatarUrls['16x16']}
                      alt="member"
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className={'font-normal ml-3 block truncate'}>{displayName}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isRecurring"
            {...register('isRecurring')}
            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <div className="ml-2">
            <label htmlFor="isRecurring" className="text-sm font-medium text-gray-900">
              Récurrent
            </label>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Début</label>
            <input
              type="date"
              {...register('startDate')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure début</label>
            <input
              type="time"
              {...register('startTime')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
        {errors.startTime && <p className="text-sm text-red-600">{errors.startTime.message}</p>}

        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3">
            <Controller
              control={control}
              name="endDistance"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  label="Fin"
                  placeholder="Saississez début"
                  disabled={!watchStartDate}>
                  <SelectItem key={1} value={0}>
                    Le même jour
                  </SelectItem>
                  <SelectItem key={2} value={1}>
                    Le jour suivant
                  </SelectItem>
                </Select>
              )}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure fin</label>
            <input
              type="time"
              {...register('endTime')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {errors.endDistance && <p className="text-sm text-red-600">{errors.endDistance.message}</p>}
        {errors.endTime && <p className="text-sm text-red-600">{errors.endTime.message}</p>}

        <div className={classNames('flex flex-col gap-3', { hidden: !watch('isRecurring') })}>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">Répète</h5>
            <div className="grid grid-cols-3 gap-1">
              {weekDays.map(({ label, value }) => (
                <div key={value} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={value}
                      type="checkbox"
                      {...register('byweekday')}
                      value={value}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <div className="ml-3 text-sm">
                      <label htmlFor={value} className="font-medium text-gray-700">
                        {label}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.byweekday && <p className="text-sm text-red-600">{errors.byweekday.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Jusqu&apos;à</label>
            <input
              type="date"
              {...register('until')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.until && <p className="text-sm text-red-600">{errors.until.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
        <div>
          {scheduleIn && (
            <button
              type="button"
              onClick={() => onDelete()}
              disabled={!!isLoading}
              className={classNames(
                isLoading ? 'bg-red-500' : 'bg-red-600 hover:bg-red-700',
                isLoading === 'delete'
                  ? 'ps-3 pe-4 outline-none ring-2 ring-offset-2 ring-red-500'
                  : 'ps-4 pe-4',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white flex justify-center gap-1 py-2 rounded-md border border-transparent shadow-sm text-base font-medium sm:w-auto sm:text-sm'
              )}>
              {isLoading === 'delete' && <ArrowPathIcon className="animate-spin h-5 w-5" />}
              Supprimer
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!!isLoading}
          className={classNames(
            isLoading ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700',
            isLoading === 'save'
              ? 'ps-3 pe-4 outline-none ring-2 ring-offset-2 ring-indigo-500'
              : 'ps-4 pe-4',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white flex justify-center gap-1 py-2 rounded-md border border-transparent shadow-sm text-base font-medium sm:w-auto sm:text-sm'
          )}>
          {isLoading === 'save' && <ArrowPathIcon className="animate-spin h-5 w-5" />}
          {scheduleIn ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}
