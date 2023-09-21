import { getBoards, getCurrentBoard } from '@/lib/board.service';
import { Suspense } from 'react';
import BoardSelector from '../../../components/board-selector';
import { getAuthData } from '@/lib/jira.service';
import EmptyState from '@/components/empty-state';
import AlertForSchedules from '../../../components/alert-for-schedules';
import SprintsSection from '@/app/(dashboard)/report/sprints-section';
import SprintsSectionSkeleton from '@/app/(dashboard)/report/sprints-section/sprints-section-skeleton';
import Link from 'next/link';

interface PreviousSprintPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
    boardId: string | undefined;
    maxResults: string | undefined;
  };
}

export default async function SprintReportPage({ searchParams }: PreviousSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const boards = await getBoards(accessToken, cloudId);
  const board = getCurrentBoard(boards, searchParams.boardId);
  const maxResults = searchParams.maxResults || '5';

  if (!board) {
    return (
      <EmptyState
        title="Aucun board trouvé"
        description="Vous n'avez pas encore créé un board de type Scrum sur votre projet Jira"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <Link
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          href={`/report?boardId=${board.id}&maxResults=${Number(maxResults) + 5}`}>
          charger plus de sprints
        </Link>

        <Suspense fallback={<></>}>
          <BoardSelector currentBoard={board} boards={boards} />
        </Suspense>
      </div>

      <Suspense fallback={<SprintsSectionSkeleton />}>
        <SprintsSection
          board={board}
          maxResults={maxResults}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>

      <Suspense fallback={<></>}>
        <AlertForSchedules accessToken={accessToken} cloudId={cloudId} />
      </Suspense>
    </div>
  );
}
