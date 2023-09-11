import { getBoards } from '@/lib/board.service';
import { getActiveSprint } from '@/lib/sprint.service';
import { Flex, Title } from '@tremor/react';
import { Suspense } from 'react';
import SprintPanelLoading from '@/app/(dashboard)/current-sprint/sprint-panel/sprint-panel-loading';
import SprintPanel from '@/app/(dashboard)/current-sprint/sprint-panel';
import BoardSelector from '@/app/(dashboard)/current-sprint/board-selector';
import LoadingBar from '@/components/LoadingBar';
import AlertForSchedules from '@/components/AlertForSchedules';
import PreviousIssueList from '@/app/(dashboard)/current-sprint/previous-issue-list';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
  const boards = await getBoards();

  if (boards.length === 0) {
    return (
      <div>
        <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
      </div>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const currentSprint = await getActiveSprint(boardId);

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
        <PreviousIssueList boardId={boardId} sprintId={currentSprint.id} />
      </Suspense>
    </>
  );
}
