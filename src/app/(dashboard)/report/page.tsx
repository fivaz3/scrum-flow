import { getAuthData } from '@/lib/jira.service';

export interface RapportProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}

export default async function Rapport({ searchParams }: RapportProps) {
  const { accessToken, cloudId } = await getAuthData();

  // if (boards.length === 0) {
  //   return (
  //     <div>
  //       <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
  //     </div>
  //   );
  // }
  //
  // const boardId = searchParams.boardId || boards[0].id;
  //
  // const sprint = await getActiveSprint(boardId);
  //
  // if (!sprint) {
  //   throw 'error';
  // }
  //
  // console.log('sprint', sprint.startDate);

  // const expectedEffort = issues.reduce((a, b) => a + (b.estimation || 0), 0);

  // console.log('expectedEffort', expectedEffort);

  return <div className="">sprints[0].id</div>;
}
