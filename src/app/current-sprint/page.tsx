import { Flex, Title } from '@tremor/react';
import { getBoards } from '@/lib/board.service';
import { getActiveSprint } from '@/lib/sprint.service';
import { Suspense } from 'react';
import IssuesList from '@/app/current-sprint/issues-list';
import LoadingBar from '@/components/LoadingBar';
import SprintPanelLoading from '@/app/current-sprint/sprint-panel/sprint-panel-loading';
import SprintPanel from '@/app/current-sprint/sprint-panel';
import BoardSelector from '@/app/current-sprint/board-selector';
import moment from 'moment';

interface ActiveSprintPageProps {
  searchParams: { [key: string]: string | string[] | undefined; boardId: string | undefined };
}
export default async function ActiveSprintPage({ searchParams }: ActiveSprintPageProps) {
  const workingSchedule = {
    id: '3',
    accountId: '1000',
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    startTime: '14:00',
    endTime: '17:00',
    isRecurring: true,
    daysOfWeek: [1, 2, 3, 4, 5],
  };

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

  interface WorkingSchedule {
    id: string;
    accountId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    isRecurring: boolean;
    daysOfWeek: number[];
  }

  interface Issue {
    id: string;
    key: string;
    fields: {
      estimation: number;
      assignee: {
        accountId: string;
        displayName: string;
      };
      status: {
        description: string;
        name: string;
        id: string;
        statusCategory: {
          id: number;
          key: string;
          colorName: string;
          name: string;
        };
      };
    };
    changelog: {
      startAt: number;
      maxResults: number;
      total: number;
      histories: {
        id: string;
        created: string;
        items: {
          fieldId?: string;
          fromString?: string | null;
          toString?: string | null;
        }[];
      }[];
    };
  }

  function getTimeSpentInProgress(issue: Issue, workingSchedule: WorkingSchedule): number {
    const histories = issue.changelog.histories;

    let timeSpent = 0;

    let inProgressStart = null;

    for (const history of histories) {
      for (const item of history.items) {
        if (item.fieldId === 'status') {
          if (item.toString === 'In Progress') {
            inProgressStart = moment(history.created);
          } else if (item.fromString === 'In Progress' && inProgressStart) {
            const inProgressEnd = moment(history.created);

            let current = moment(inProgressStart);

            while (current.isBefore(inProgressEnd)) {
              if (
                current.isBetween(
                  workingSchedule.startDate,
                  workingSchedule.endDate,
                  undefined,
                  '[]'
                ) &&
                workingSchedule.daysOfWeek.includes(current.day())
              ) {
                const startOfWorkDay = moment(current)
                  .hour(parseInt(workingSchedule.startTime.split(':')[0]))
                  .minute(parseInt(workingSchedule.startTime.split(':')[1]))
                  .second(0);

                const endOfWorkDay = moment(current)
                  .hour(parseInt(workingSchedule.endTime.split(':')[0]))
                  .minute(parseInt(workingSchedule.endTime.split(':')[1]))
                  .second(0);

                if (current.isSameOrAfter(startOfWorkDay)) {
                  if (inProgressEnd.isSameOrBefore(endOfWorkDay)) {
                    timeSpent += inProgressEnd.diff(current, 'seconds');
                    current = inProgressEnd;
                  } else {
                    timeSpent += endOfWorkDay.diff(current, 'seconds');
                    current = endOfWorkDay.add(1, 'day').startOf('day');
                  }
                } else {
                  current = startOfWorkDay;
                }
              } else {
                current.add(1, 'day').startOf('day');
              }
            }

            inProgressStart = null;
          }
        }
      }
    }

    return timeSpent / (60 * 60);
  }

  const timeSpentInProgress = getTimeSpentInProgress(issue, workingSchedule);

  console.log(`Time spent in progress within working schedule: ${timeSpentInProgress} hours`);

  const boards = await getBoards();

  if (boards.length === 0) {
    return (
      <div>
        <Title>Vous n&apos;avez pas encore créé un board de type Scrum</Title>
      </div>
    );
  }

  const boardId = searchParams.boardId || boards[0].id;

  const currentSprint = await getActiveSprint(boardId);

  if (!currentSprint) {
    return (
      <div>
        <Title>Il n&apos;y a pas encore de sprint actives</Title>
      </div>
    );
  }

  return (
    <>
      <Flex className="content-start">
        <Suspense fallback={<SprintPanelLoading />}>
          <SprintPanel sprint={currentSprint} />
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
        <IssuesList boardId={boardId} sprintId={currentSprint.id} />
      </Suspense>
    </>
  );
}
