import { Flex, Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { getActiveSprint } from '@/lib/sprint.service';
import { Suspense } from 'react';
import IssuesList from '@/app/current-sprint/issues-list';
import LoadingBar from '@/components/LoadingBar';
import SprintPanelLoading from '@/app/current-sprint/sprint-panel/sprint-panel-loading';
import SprintPanel from '@/app/current-sprint/sprint-panel';
import BoardSelector from '@/app/current-sprint/board-selector';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
  const boards = await getBoards();

  if (boards.length === 0) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>
          <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
        </div>
      </main>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const currentSprint = await getActiveSprint(boardId);

  if (!currentSprint) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>
          <Title>Il n&apos;y a pas encore de sprint actives</Title>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Flex className="content-start">
        <Suspense fallback={<SprintPanelLoading />}>
          <SprintPanel currentSprint={currentSprint} />
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
        <IssuesList boardId={boardId} currentSprintId={currentSprint.id} />
      </Suspense>
    </main>
  );
}
