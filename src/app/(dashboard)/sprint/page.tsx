import { getBoards, getCurrentBoard } from '@/lib/board.service';
import { Suspense } from 'react';
import AlertForSchedules from '../../../components/alert-for-schedules';
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
  const board = getCurrentBoard(boards, searchParams.boardId);

  if (!board) {
    return (
      <EmptyState
        title="Aucun board trouvé"
        description="Vous n'avez pas encore créé un board de type Scrum sur votre projet Jira"
      />
    );
  }

  const sprint = await getActiveSprint(board.id, accessToken, cloudId);

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
        <BoardSelector currentBoard={board} boards={boards} />
      </div>

      <Suspense fallback={<ActiveIssueTableListSkeleton />}>
        <ActiveIssueTableList
          board={board}
          sprint={sprint}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>

      <Suspense fallback={<></>}>
        <AlertForSchedules accessToken={accessToken} cloudId={cloudId} />
      </Suspense>
    </>
  );
}
