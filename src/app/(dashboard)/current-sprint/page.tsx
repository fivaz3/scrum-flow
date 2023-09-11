import { getBoards } from '@/lib/board.service';
import { getActiveSprint } from '@/lib/sprint.service';
import { Flex, Title } from '@tremor/react';
import { Suspense } from 'react';
import SprintPanelLoading from '@/components/sprint-panel/sprint-panel-loading';
import SprintPanel from '../../../components/sprint-panel';
import BoardSelector from '../../../components/board-selector';
import LoadingBar from '@/components/LoadingBar';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import CurrentIssueList from '@/app/(dashboard)/current-sprint/current-issue-table';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
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

  const currentSprint = await getActiveSprint(boardId, accessToken, cloudId);

  if (!currentSprint) {
    return (
      <div>
        <Title>Il n&apos;y a pas encore de sprint actives</Title>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
      <Flex className="content-start">
        <Suspense fallback={<SprintPanelLoading />}>
          <SprintPanel sprint={currentSprint} />
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
        <CurrentIssueList
          boardId={boardId}
          sprintId={currentSprint.id}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>
    </>
  );
}
