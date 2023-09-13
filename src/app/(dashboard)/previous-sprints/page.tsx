import { Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import PreviousIssueList from './previous-issue-list';
import LoadingBar from '@/components/LoadingBar';
import SprintPanel from '../../../components/sprint-panel';
import BoardSelector from '../../../components/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';

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

  return (
    <>
      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>

      <div className="flex justify-end">
        <BoardSelector boardId={`${boardId}`} boards={boards} />
      </div>

      {sprints.map((sprint) => (
        <div key={sprint.id}>
          <div className="my-5">
            <SprintPanel sprint={sprint} />
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
