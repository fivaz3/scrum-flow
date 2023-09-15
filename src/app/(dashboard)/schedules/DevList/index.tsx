import React from 'react';
import { Member } from '@/app/(dashboard)/schedules/Calendar/member.service';

interface DevListProps {
  members: Member[];
  selectedMemberIds: string[];
  handleMemberSelect: (_memberId: string) => void;
  openForm: () => void;
}

export default function MembersList({
  members,
  selectedMemberIds,
  openForm,
  handleMemberSelect,
}: DevListProps) {
  return (
    <>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4" onClick={openForm}>
        Add Schedule
      </button>
      <ul>
        {members.map((member) => (
          <li key={member.accountId} className="mb-2">
            <input
              type="checkbox"
              checked={selectedMemberIds.includes(member.accountId)}
              onChange={() => handleMemberSelect(member.accountId)}
            />
            <span className="ml-2">{member.displayName}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
