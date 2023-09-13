import { Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import PreviousIssueList from './previous-issue-list';
import LoadingBar from '@/components/LoadingBar';
import BoardSelector from '../../../components/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import PreviousSprintPanel from '@/app/(dashboard)/sprints-report/previous-issue-list/previous-sprint-panel';
import { getDataForLineChart } from '@/app/(dashboard)/sprints-report/sprint-effort';
import Graph from '@/components/graph';

// TODO tell how much a point represent for each sprint and right now

interface PreviousSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function PreviousSprintPage({ searchParams }: PreviousSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const boards = await getBoards(accessToken, cloudId);

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
        <div key={sprint.id}>
          <div className="my-5">
            <PreviousSprintPanel
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
              sprintId={sprint.id}
              accessToken={accessToken}
              cloudId={cloudId}
            />
          </Suspense>
        </div>
      ))}
    </>
  );
}
