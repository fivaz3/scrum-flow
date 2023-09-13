import Graph from '@/components/graph';
import { getBoards } from '@/lib/board.service';
import { getPreviousSprints } from '@/lib/sprint.service';
import { getAuthData } from '@/lib/jira.service';
import { getDataForLineChart } from '@/app/(dashboard)/report/sprint-effort';

export interface RapportProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
// TODO tell how much a point represent for each sprint and right now

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

  const sprints = await getPreviousSprints(boardId, accessToken, cloudId);

  const data = await getDataForLineChart(boardId, sprints, accessToken, cloudId);

  return <Graph data={data}></Graph>;
}
