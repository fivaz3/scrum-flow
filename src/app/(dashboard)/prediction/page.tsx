import PredictionClient from '@/app/(dashboard)/prediction/prediction-client';
import { getAuthData } from '@/lib/jira.service';
import { getBoards, getCurrentBoard } from '@/lib/board.service';
import EmptyState from '@/components/empty-state';
import { Suspense } from 'react';
import BoardSelector from '@/components/board-selector';

interface PredictionProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
    boardId: string | undefined;
  };
}

export default async function Prediction({ searchParams }: PredictionProps) {
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

  return (
    <div className="">
      <div className="flex justify-end items-center">
        <Suspense fallback={<></>}>
          <BoardSelector currentBoard={board} boards={boards} />
        </Suspense>
      </div>

      <PredictionClient board={board} accessToken={accessToken} cloudId={cloudId} />
    </div>
  );
}
