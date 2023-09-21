import React from 'react';
import { Member } from '@/app/(dashboard)/schedules/calendar/member.service';
import ButtonWithLoading from '@/components/button-with-loading';

interface DevListProps {
  members: Member[];
  selectedMemberIds: string[];
  handleMemberSelect: (_memberId: string) => void;
  openForm: () => void;
  loading?: boolean;
}

export default function MembersList({
  members,
  selectedMemberIds,
  openForm,
  handleMemberSelect,
  loading = false,
}: DevListProps) {
  return (
    <div className="flex flex-col gap-3">
      <ButtonWithLoading onClick={openForm} disabled={loading}>
        Ajouter plan de travail
      </ButtonWithLoading>
      <h2 className="text-lg font-medium text-gray-900">Membres</h2>
      {members.map((member) => (
        <div key={member.accountId} className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id={member.accountId}
              type="checkbox"
              checked={selectedMemberIds.includes(member.accountId)}
              onChange={() => handleMemberSelect(member.accountId)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <div className="ml-3 text-sm">
              <label htmlFor={member.accountId} className="font-medium text-gray-700">
                {member.displayName}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
