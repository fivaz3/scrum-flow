import { getAuthData } from '@/lib/jira.service';
import { getActiveSprint, getEstimatedEffort } from '@/lib/sprint.service';
import { getBoards } from '@/lib/board.service';

export interface RapportProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}

export default async function Rapport({ searchParams }: RapportProps) {
  const { accessToken, cloudId } = await getAuthData();

  const boards = await getBoards(accessToken, cloudId);

  if (boards.length === 0) {
    return (
      <div>
        <p>Vous n&apos;avez pas encore créé un board de type Scrum</p>
      </div>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const sprint = await getActiveSprint(boardId, accessToken, cloudId);

  if (!sprint) {
    throw 'error';
  }

  const number = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);

  console.log(number);

  return <div className="">sprints[0].id</div>;
}
