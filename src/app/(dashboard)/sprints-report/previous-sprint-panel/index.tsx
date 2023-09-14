import PreviousSprintHeader from '@/app/(dashboard)/sprints-report/previous-sprint-panel/previous-issue-list/previous-sprint-panel';
import { Suspense } from 'react';
import LoadingBar from '@/components/LoadingBar';
import PreviousIssueList from '@/app/(dashboard)/sprints-report/previous-sprint-panel/previous-issue-list';
import { Sprint } from '@/lib/sprint.service';

export interface PreviousSprintPanelProps {
  sprint: Sprint;
  boardId: number | string;
  accessToken: string;
  cloudId: string;
}

// TODO change all loading states LoadingBar uses JS which is terrible

// TODO tell how much a point represent for each sprint and right now

export default async function PreviousSprintPanel({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: PreviousSprintPanelProps) {
  return (
    <div>
      <div className="my-5">
        <PreviousSprintHeader
          boardId={boardId}
          sprint={sprint}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </div>

      <Suspense
        fallback={
          <div>
            chargement des tickets...
            <LoadingBar />
          </div>
        }>
        <PreviousIssueList
          boardId={boardId}
          sprint={sprint}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>
    </div>
  );
}
