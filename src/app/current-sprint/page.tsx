import { main } from '@/app/current-sprint/test1';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
  main();

  const issue = {
    id: '10020',
    key: 'SCRUM-18',
    fields: {
      estimation: 0.5,
      assignee: { accountId: '1000', displayName: 'Mark Stein' },
      status: {
        description: '',
        name: 'Done',
        id: '10004',
        statusCategory: { id: 3, key: 'done', colorName: 'green', name: 'Done' },
      },
    },
    changelog: {
      startAt: 0,
      maxResults: 5,
      total: 5,
      histories: [
        {
          id: '10178',
          created: '2023-09-05T12:16:20.264+0200',
          items: [
            {
              field: 'resolution',
              fieldtype: 'jira',
              fieldId: 'resolution',
              from: null,
              fromString: null,
              to: '10000',
              toString: 'Done',
            },
            {
              field: 'status',
              fieldtype: 'jira',
              fieldId: 'status',
              from: '3',
              fromString: 'In Progress',
              to: '10004',
              toString: 'Done',
            },
          ],
        },
        {
          id: '10177',
          created: '2023-09-05T12:06:47.779+0200',
          items: [
            {
              field: 'status',
              fieldtype: 'jira',
              fieldId: 'status',
              from: '10003',
              fromString: 'To Do',
              to: '3',
              toString: 'In Progress',
            },
          ],
        },
        {
          id: '10166',
          created: '2023-09-05T12:06:23.537+0200',
          items: [
            {
              field: 'Rank',
              fieldtype: 'custom',
              fieldId: 'customfield_10019',
              from: '',
              fromString: '',
              to: '',
              toString: 'Ranked higher',
            },
          ],
        },
        {
          id: '10165',
          created: '2023-09-05T12:06:23.270+0200',
          items: [
            {
              field: 'Sprint',
              fieldtype: 'custom',
              fieldId: 'customfield_10020',
              from: '',
              fromString: '',
              to: '11',
              toString: 'SCRUM Sprint 7',
            },
          ],
        },
        {
          id: '10164',
          created: '2023-09-05T12:06:15.520+0200',
          items: [
            {
              field: 'Story Points',
              fieldtype: 'custom',
              fieldId: 'customfield_10034',
              from: null,
              fromString: null,
              to: null,
              toString: '0.5',
            },
          ],
        },
      ],
    },
  };

  // function getTimeSpentInStatus(issue: Issue, workingSchedules: WorkingSchedule[]) {
  //   const histories = issue.changelog.histories.sort(
  //     (a, b) => parseISO(a.created).getTime() - parseISO(b.created).getTime()
  //   );
  //
  //   let timeSpent = 0;
  //
  //   let inProgressStart = null;
  //
  //   for (const history of histories) {
  //     for (const item of history.items) {
  //       if (item.fieldId === 'status') {
  //         if (item.toString === 'In Progress') {
  //           inProgressStart = history.created; // start tracking time
  //         } else if (item.fromString === 'In Progress' && inProgressStart) {
  //           timeSpent += calculateTime(workingSchedules, inProgressStart, history.created);
  //           inProgressStart = null; // stop tracking time
  //         }
  //       }
  //     }
  //   }
  //
  //   if (inProgressStart && issue.fields.status.name === 'In Progress') {
  //     // issue is still in progress
  //     timeSpent += calculateTime(workingSchedules, inProgressStart, new Date().toISOString());
  //   }
  //
  //   return timeSpent; // returns time spent in minutes
  // }

  // console.log(
  //   `Time spent in progress within working schedule: ${getTimeSpentInStatus(
  //     issue,
  //     workingSchedules
  //   )} hours`
  // );

  // console.log(
  //   `Time spent in progress within working schedule luxon: ${calculateTimeSpentInProgressLuxon(
  //     issue,
  //     workingSchedule
  //   )} hours`
  // );

  // const boards = await getBoards();
  //
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
  // const currentSprint = await getActiveSprint(boardId);
  //
  // if (!currentSprint) {
  //   return (
  //     <div>
  //       <Title>Il n&apos;y a pas encore de sprint actives</Title>
  //     </div>
  //   );
  // }
  //
  // return (
  //   <>
  //     <Flex className="content-start">
  //       <Suspense fallback={<SprintPanelLoading />}>
  //         <SprintPanel sprint={currentSprint} />
  //         <BoardSelector boardId={`${boardId}`} boards={boards} />
  //       </Suspense>
  //     </Flex>
  //     <Suspense
  //       fallback={
  //         <div>
  //           chargement des tickets...
  //           <LoadingBar />
  //         </div>
  //       }>
  //       <IssuesList boardId={boardId} sprintId={currentSprint.id} />
  //     </Suspense>
  //   </>
  // );
}
