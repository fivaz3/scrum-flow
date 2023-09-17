'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  addSchedule,
  deleteSchedule,
  editSchedule,
  Schedule,
  ScheduleIn,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import ScheduleForm from '../schedule-form';
import Modal from '@/components/Modal';
import MembersList from '../dev-list';
import { Member } from '@/app/(dashboard)/schedules/calendar/member.service';
import CalendarCore from '@/app/(dashboard)/schedules/calendar/calendar-core';

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
  data: ScheduleIn,
  selectedScheduleId: string | undefined,
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>,
  setShowDialog: Dispatch<SetStateAction<boolean>>,
  accessToken: string,
  cloudId: string
) {
  if (selectedScheduleId) {
    await handleEditSchedule(data, selectedScheduleId, accessToken, cloudId, setSchedules);
  } else {
    await handleAddSchedule(data, accessToken, cloudId, setSchedules);
  }
  setSelectedSchedule(null);
  setShowDialog(false);
}

async function handleAddSchedule(
  scheduleIn: ScheduleIn,
  accessToken: string,
  cloudId: string,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>
) {
  const schedule = await addSchedule(scheduleIn, accessToken, cloudId);
  setSchedules((previousSchedules) => [...previousSchedules, schedule]);
}

async function handleEditSchedule(
  scheduleIn: ScheduleIn,
  id: string,
  accessToken: string,
  cloudId: string,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>
) {
  const editedSchedule = await editSchedule(scheduleIn, id, accessToken, cloudId);
  setSchedules((schedules) =>
    schedules.map((schedule) => (schedule.id === editedSchedule.id ? editedSchedule : schedule))
  );
}

async function handleDeleteSchedule(
  selectedScheduleId: string | undefined,
  accessToken: string,
  cloudId: string,
  setSchedules: Dispatch<SetStateAction<Schedule[]>>,
  schedules: Schedule[],
  setShowDialog: Dispatch<SetStateAction<boolean>>,
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>
) {
  if (selectedScheduleId) {
    await deleteSchedule(selectedScheduleId, accessToken, cloudId);
    setSchedules(schedules.filter((schedule) => schedule.id !== selectedScheduleId));
    setShowDialog(false);
    setSelectedSchedule(null);
  }
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
          onSubmit={(data) =>
            handleAddOrEditSchedule(
              data,
              selectedSchedule?.id,
              setSelectedSchedule,
              setSchedules,
              setShowDialog,
              accessToken,
              cloudId
            )
          }
          onDelete={() =>
            handleDeleteSchedule(
              selectedSchedule?.id,
              accessToken,
              cloudId,
              setSchedules,
              schedules,
              setShowDialog,
              setSelectedSchedule
            )
          }
        />
      </Modal>
    </>
  );
}
