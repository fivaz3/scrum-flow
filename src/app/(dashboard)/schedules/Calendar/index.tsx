'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  Schedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import Modal from '../../../../components/modal';
import MembersList from '../dev-list';
import { Member } from '@/app/(dashboard)/schedules/calendar/member.service';
import CalendarCore from '@/app/(dashboard)/schedules/calendar/calendar-core';
import ScheduleForm from '../schedule-form';

function handleMemberSelect(
  memberId: string,
  selectedMemberIds: string[],
  setSelectedMemberIds: Dispatch<SetStateAction<string[]>>
) {
  if (selectedMemberIds.includes(memberId)) {
    setSelectedMemberIds(selectedMemberIds.filter((id) => id !== memberId));
  } else {
    setSelectedMemberIds([...selectedMemberIds, memberId]);
  }
}

async function handleAddOrEditSchedule(
  schedule: Omit<Schedule, 'id'>,
  selectedScheduleId: string | undefined,
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>,
  setShowDialog: Dispatch<SetStateAction<boolean>>,
  setFormLoading: Dispatch<SetStateAction<'delete' | 'save' | null>>,
  accessToken: string,
  cloudId: string
) {
  setFormLoading('save');
  if (selectedScheduleId) {
    await handleEditSchedule(schedule, selectedScheduleId, accessToken, cloudId, setSchedules);
  } else {
    await handleAddSchedule(schedule, accessToken, cloudId, setSchedules);
  }
  setSelectedSchedule(null);
  setShowDialog(false);
  setFormLoading(null);
}

async function handleAddSchedule(
  data: Omit<Schedule, 'id'>,
  accessToken: string,
  cloudId: string,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>
) {
  const schedule = await addSchedule(data, accessToken, cloudId);
  setSchedules((previousSchedules) => [...previousSchedules, schedule]);
}

async function handleEditSchedule(
  data: Omit<Schedule, 'id'>,
  id: string,
  accessToken: string,
  cloudId: string,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>
) {
  const editedSchedule = await editSchedule(data, id, accessToken, cloudId);
  setSchedules((schedules) =>
    schedules.map((schedule) => (schedule.id === editedSchedule.id ? editedSchedule : schedule))
  );
}

async function handleDeleteSchedule(
  selectedScheduleId: string | undefined,
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>,
  setShowDialog: Dispatch<SetStateAction<boolean>>,
  setFormLoading: Dispatch<SetStateAction<'delete' | 'save' | null>>,
  accessToken: string,
  cloudId: string
) {
  setFormLoading('delete');
  if (selectedScheduleId) {
    await deleteSchedule(selectedScheduleId, accessToken, cloudId);
    setSchedules((schedules) => schedules.filter((schedule) => schedule.id !== selectedScheduleId));
    setShowDialog(false);
    setSelectedSchedule(null);
  }
  setFormLoading(null);
}

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
  const [isFormLoading, setFormLoading] = useState<'delete' | 'save' | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>(currentSchedules);

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    members.map((member) => member.accountId)
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

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
            handleMemberSelect={(memberId) =>
              handleMemberSelect(memberId, selectedMemberIds, setSelectedMemberIds)
            }
          />
        </div>
        <div className="w-4/5">
          <CalendarCore
            schedules={schedules}
            members={members}
            selectedMemberIds={selectedMemberIds}
            setSelectedSchedule={setSelectedSchedule}
            setShowDialog={setShowDialog}
          />
        </div>
      </div>
      <Modal isOpen={showDialog} setOpen={() => setShowDialog(false)}>
        <ScheduleForm
          members={members}
          selectedSchedule={selectedSchedule}
          isLoading={isFormLoading}
          onSubmit={(data) =>
            handleAddOrEditSchedule(
              data,
              selectedSchedule?.id,
              setSelectedSchedule,
              setSchedules,
              setShowDialog,
              setFormLoading,
              accessToken,
              cloudId
            )
          }
          onDelete={() =>
            handleDeleteSchedule(
              selectedSchedule?.id,
              setSelectedSchedule,
              setSchedules,
              setShowDialog,
              setFormLoading,
              accessToken,
              cloudId
            )
          }
        />
      </Modal>
    </>
  );
}
