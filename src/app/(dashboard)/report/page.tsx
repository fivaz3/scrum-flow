import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import SprintAccuracyChart from '../../../components/sprint-accuracy-chart';
import PreviousSprintPanel from '@/app/(dashboard)/report/previous-sprint-panel';
import Loading from '@/components/loading';
import EmptyState from '@/components/empty-state';

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
    <>
      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
      <div className="flex justify-end">
        <BoardSelector boardId={`${boardId}`} boards={boards} />
      </div>
      <div className="my-5">
        <h1 className="text-lg leading-6 font-semibold text-gray-900"></h1>
        <Suspense fallback={<Loading title="chargement du graphique..."></Loading>}>
          <SprintAccuracyChart
            boardId={boardId}
            sprints={sprints}
            accessToken={accessToken}
            cloudId={cloudId}
          />
        </Suspense>
      </div>
      {sprints.map((sprint) => (
        <Suspense key={sprint.id} fallback={<div>chargement des sprints...</div>}>
          <PreviousSprintPanel
            boardId={boardId}
            sprint={sprint}
            accessToken={accessToken}
            cloudId={cloudId}
          />
        </Suspense>
      ))}
    </>
  );
}
