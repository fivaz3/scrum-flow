import { Flex, Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import PreviousIssueList from '../current-sprint/previous-issue-list';
import LoadingBar from '@/components/LoadingBar';
import SprintPanelLoading from '@/app/(dashboard)/current-sprint/sprint-panel/sprint-panel-loading';
import SprintPanel from '@/app/(dashboard)/current-sprint/sprint-panel';
import BoardSelector from '@/app/(dashboard)/current-sprint/board-selector';
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
      {sprints.map((sprint) => (
        <div key={sprint.id}>
          <Flex className="content-start">
            <Suspense fallback={<SprintPanelLoading />}>
              <SprintPanel sprint={sprint} />
              <BoardSelector boardId={`${boardId}`} boards={boards} />
            </Suspense>
          </Flex>
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
