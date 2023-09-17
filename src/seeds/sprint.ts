import { ActiveSprint, ClosedSprint } from '@/lib/sprint.service';
import { addDays } from 'date-fns';

export const seedActiveSprint: ActiveSprint = {
  id: 2,
  name: 'Sprint 2',
  startDate: new Date().toISOString(),
  endDate: addDays(new Date(), 7).toISOString(),
  state: 'active',
  originBoardId: 1,
};

export const seedClosedSprint: ClosedSprint = {
  id: 1,
  name: 'Sprint 1',
  startDate: new Date().toISOString(),
  endDate: addDays(new Date(), 7).toISOString(),
  completeDate: addDays(new Date(), 7).toISOString(),
  state: 'closed',
  originBoardId: 1,
};
