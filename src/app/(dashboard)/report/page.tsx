import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getClosedSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import SprintAccuracyChart from './sprint-accuracy-chart';
import Loading from '@/components/loading';
import EmptyState from '@/components/empty-state';
import ClosedSprintPanel from '@/app/(dashboard)/report/closed-sprint-panel';

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

  const sprints = await getClosedSprints(boardId, accessToken, cloudId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
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
        <ClosedSprintPanel
          key={sprint.id}
          boardId={boardId}
          sprint={sprint}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      ))}

      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
    </div>
  );
}
