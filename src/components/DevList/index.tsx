import { PlusIcon } from '@heroicons/react/20/solid';

export type Employee = {
  id: string;
  name: string;
};

export interface DevListProps {
  employees: Employee[];
  addScheduleEvent: (_employeeId: string) => void;
}

export default function DevList({ employees, addScheduleEvent }: DevListProps) {
  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id} className="flex items-center my-2">
          <span className="mr-2">{employee.name}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => addScheduleEvent(employee.id)}>
            <PlusIcon className="w-6 h-6" />
          </button>
        </li>
      ))}
    </ul>
  );
}
