import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import SprintAccuracyChart from './sprint-accuracy-chart';
import Loading from '@/components/loading';
import EmptyState from '@/components/empty-state';
import ClosedIssueTable from '@/app/(dashboard)/report/closed-issue-table';
import ClosedSprintHeader from '@/app/(dashboard)/report/closed-sprint-header';
import ClosedSprintHeaderSkeleton from '@/app/(dashboard)/report/closed-sprint-header/closed-sprint-header-skeleton';

interface PreviousSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function SprintReportPage({ searchParams }: PreviousSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const boards = await getBoards(accessToken, cloudId);

  if (boards.length === 0) {
    return (
      <EmptyState
        title="Aucun board trouvé"
        description="Vous n'avez pas encore créé un board de type Scrum sur votre projet Jira"
      />
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const sprints = await getPreviousSprints(boardId, accessToken, cloudId);

  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
      <div className="ml-auto">
        <BoardSelector boardId={`${boardId}`} boards={boards} />
      </div>
      <Suspense fallback={<Loading title="chargement du graphique..."></Loading>}>
        <SprintAccuracyChart
          boardId={boardId}
          sprints={sprints}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>
      {sprints.map((sprint) => (
        <div key={sprint.id}>
          <Suspense fallback={<ClosedSprintHeaderSkeleton />}>
            <ClosedSprintHeader
              boardId={boardId}
              sprint={sprint}
              accessToken={accessToken}
              cloudId={cloudId}
            />
          </Suspense>

          <Suspense fallback={<Loading title="chargement des tickets..." />}>
            <ClosedIssueTable
              boardId={boardId}
              sprint={sprint}
              accessToken={accessToken}
              cloudId={cloudId}
            />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
