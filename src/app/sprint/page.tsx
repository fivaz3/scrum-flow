import { Flex, Text, Grid, Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { getActiveSprint } from '@/lib/sprint.service';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';
import IssueTable from '@/app/sprint/IssueTable';
import { format, parseISO } from 'date-fns';
import BoardSelector from '@/app/sprint/BoardSelector';

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
  // const boardId = 2;

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

  const { toDoIssues, doingIssues, doneIssues } = await getIssuesFromSprintWithChangelog(
    boardId,
    currentSprint.id
  );

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div>
        <Flex className="content-start">
          <div>
            <Title className="text-2xl">Sprint Actuel: {currentSprint.name}</Title>
            <Text>
              Commence le : {format(parseISO(currentSprint.startDate), 'dd/MM/yyyy à HH:mm')}
            </Text>
            <Text>Fini le : {format(parseISO(currentSprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
          </div>
          <BoardSelector boardId={`${boardId}`} boards={boards} />
        </Flex>
        <Grid className="gap-6 mt-4">
          <IssueTable label="To Do" issues={toDoIssues}></IssueTable>
          <IssueTable label="Doing" issues={doingIssues}></IssueTable>
          <IssueTable label="Done" issues={doneIssues}></IssueTable>
        </Grid>
      </div>
    </main>
  );
}
