import { Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import Graph from '@/components/graph';
import { getDataForLineChart } from '@/app/(dashboard)/report/sprint-effort';
import PreviousSprintPanel from '@/app/(dashboard)/report/previous-sprint-panel';

interface PreviousSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function SprintReportPage({ searchParams }: PreviousSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const boards = await getBoards(accessToken, cloudId);

  // TODO replace it by an empty state from tailwindui
  if (boards.length === 0) {
    return (
      <div>
        <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
      </div>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const sprints = await getPreviousSprints(boardId, accessToken, cloudId);

  const data = await getDataForLineChart(boardId, sprints, accessToken, cloudId);

  return (
    <>
      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
      <div className="flex justify-end">
        <BoardSelector boardId={`${boardId}`} boards={boards} />
      </div>
      <Suspense fallback={<></>}>
        <div className="my-5">
          <Graph data={data}></Graph>
        </div>
      </Suspense>
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
