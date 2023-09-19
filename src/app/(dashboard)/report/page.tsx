import { getBoards, getCurrentBoard } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getClosedSprints } from '@/lib/sprint.service';
import { getAuthData } from '@/lib/jira.service';
import Loading from '@/components/loading';
import EmptyState from '@/components/empty-state';
import AlertForSchedules from '@/components/AlertForSchedules';
import ClosedSprintPanel from '@/app/(dashboard)/report/closed-sprint-panel';
import SprintAccuracyChart from '@/app/(dashboard)/report/sprint-accuracy-chart';

interface PreviousSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}

export default async function SprintReportPage({ searchParams }: PreviousSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const boards = await getBoards(accessToken, cloudId);
  const board = getCurrentBoard(boards, searchParams.boardId);

  if (!board) {
    return (
      <EmptyState
        title="Aucun board trouvé"
        description="Vous n'avez pas encore créé un board de type Scrum sur votre projet Jira"
      />
    );
  }

  const sprints = await getClosedSprints(board.id, accessToken, cloudId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Suspense fallback={<></>}>
          <BoardSelector currentBoard={board} boards={boards} />
        </Suspense>
      </div>
      <Suspense fallback={<Loading title="chargement du graphique..."></Loading>}>
        <SprintAccuracyChart
          boardId={board.id}
          sprints={sprints}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>
      {sprints.map((sprint) => (
        <ClosedSprintPanel
          key={sprint.id}
          boardId={board.id}
          sprint={sprint}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      ))}

      <Suspense fallback={<></>}>
        <AlertForSchedules accessToken={accessToken} cloudId={cloudId} />
      </Suspense>
    </div>
  );
}
