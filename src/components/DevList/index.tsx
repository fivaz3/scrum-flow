import { PlusIcon } from '@heroicons/react/20/solid';

export type Member = {
  id: string;
  name: string;
};

export interface DevListProps {
  members: Member[];
  addScheduleEvent: (_memberId: string) => void;
}

export default function DevList({ members, addScheduleEvent }: DevListProps) {
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id} className="flex items-center my-2">
          <span className="mr-2">{member.name}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => addScheduleEvent(member.id)}>
            <PlusIcon className="w-6 h-6" />
          </button>
        </li>
      ))}
    </ul>
  );
}
