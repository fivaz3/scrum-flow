import { getBoards } from '@/lib/board.service';
import { Suspense } from 'react';
import AlertForSchedules from '@/components/AlertForSchedules';
import { getAuthData } from '@/lib/jira.service';
import EmptyState from '@/components/empty-state';
import { getActiveSprint } from '@/lib/sprint.service';
import SprintPanel from '@/app/(dashboard)/sprint/active-issue-table-list/sprint-panel';
import BoardSelector from '@/components/board-selector';
import ActiveIssueTableListSkeleton from '@/app/(dashboard)/sprint/active-issue-table-list-skeleton';
import ActiveIssueTableList from '@/app/(dashboard)/sprint/active-issue-table-list';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
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

  const sprint = await getActiveSprint(boardId, accessToken, cloudId);

  if (!sprint) {
    return (
      <EmptyState
        title="Aucun sprint active trouvé"
        description="Vous n'avez pas encore démarré votre sprint sur Jira"
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <SprintPanel sprint={sprint} />
        <BoardSelector boardId={`${boardId}`} boards={boards} />
      </div>

      <Suspense fallback={<ActiveIssueTableListSkeleton />}>
        <ActiveIssueTableList
          boardId={boardId}
          sprintId={sprint.id}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>

      <Suspense fallback={<></>}>
        <AlertForSchedules />
      </Suspense>
    </>
  );
}
