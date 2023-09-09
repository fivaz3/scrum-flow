import { Flex, Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import IssuesList from '@/app/current-sprint/issues-list';
import LoadingBar from '@/components/LoadingBar';
import SprintPanelLoading from '@/app/current-sprint/sprint-panel/sprint-panel-loading';
import SprintPanel from '@/app/current-sprint/sprint-panel';
import BoardSelector from '@/app/current-sprint/board-selector';
import { getPreviousSprints } from '@/lib/sprint.service';
import AlertForSchedules from '@/components/AlertForSchedules';

interface PreviousSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function PreviousSprintPage({ searchParams }: PreviousSprintPageProps) {
  const boards = await getBoards();

  if (boards.length === 0) {
    return (
      <div>
        <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
      </div>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const sprints = await getPreviousSprints(boardId);

  if (!sprints) {
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
      {sprints.map((sprint) => (
        <>
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
            <IssuesList boardId={boardId} sprintId={sprint.id} />
          </Suspense>
        </>
      ))}
    </>
  );
}
