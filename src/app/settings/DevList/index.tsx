import React from 'react';

export type Member = {
  id: string;
  name: string;
};

export interface DevListProps {
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={openForm}>
        Add Schedule
      </button>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="mb-2">
            <input
              type="checkbox"
              checked={selectedMemberIds.includes(member.id)}
              onChange={() => handleMemberSelect(member.id)}
            />
            <span className="ml-2">{member.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
