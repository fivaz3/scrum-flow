import { z } from 'zod';
import { callApi, getAuthData, validateData } from '@/lib/jira.service';
import { getBoardConfiguration, getInProgressStatuses } from '@/lib/board.service';
import { intervalToDuration, parseISO, differenceInSeconds, formatDuration } from 'date-fns';

const IssueSchema = z.object({
  id: z.string(),
  fields: z.object({
    summary: z.string(),
    estimation: z.number().nullable(),
    status: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
});

export type Issue = z.infer<typeof IssueSchema>;

async function transformIssues(boardId: number, rawIssues: unknown) {
  const configuration = await getBoardConfiguration(boardId);

  const IssueSchemaTransformation = z.object({
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(
      z
        .object({
          id: z.string(),
          fields: z
            .object({
              [configuration.estimation.field.fieldId]: z.number().nullable(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  });

  const { issues } = validateData(IssueSchemaTransformation, rawIssues);

  const formattedIssues = issues.map((issue) => ({
    ...issue,
    fields: {
      ...issue.fields,
      estimation: issue.fields[configuration.estimation.field.fieldId],
    },
  }));

  const IssueSchemaWithOthers = z.object({ fields: z.object({}).passthrough() }).passthrough();

  return validateData(z.array(IssueSchema.merge(IssueSchemaWithOthers)), formattedIssues);
}

// TODO add pagination
// TODO these issues have too many useless attributes, I should request only those I need
export async function getIssuesFromSprint(
  boardId: number,
  sprintId: number,
  queryParams: Record<string, string>
) {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
    queryParams
  );

  return await transformIssues(boardId, response);
}

const IssueWithChangeLogSchema = IssueSchema.merge(
  z.object({
    changelog: z.object({
      startAt: z.number(),
      maxResults: z.number(),
      total: z.number(),
      histories: z.array(
        z.object({
          id: z.string(),
          created: z.string(),
          items: z.array(
            z.object({
              field: z.string(),
              fieldId: z.string(),
              from: z.string().nullable(),
              fromString: z.string().nullable(),
              to: z.string().nullable(),
              toString: z.string().nullable(),
            })
          ),
        })
      ),
    }),
  })
);

export type IssueWithChangeLog = z.infer<typeof IssueWithChangeLogSchema>;

export async function getIssuesFromSprintWithChangelog(boardId: number, sprintId: number) {
  //Promise<{ toDoIssues: Issue[]; doingIssues: Issue[]; doneIssues: Issue[] }>
  const issues = await getIssuesFromSprint(boardId, sprintId, { expand: 'changelog' });

  const issuesWithChangelog = validateData(z.array(IssueWithChangeLogSchema), issues);

  const issue = issuesWithChangelog.find((issue) => issue.id === '10012');

  if (issue) await getTimeInStatus(issue);
}

async function callBackend(path: string, queryParams: Record<string, string>) {
  const { accessToken, cloudId } = await getAuthData();
  const url = `${process.env.BACKEND_URL as string}${path}?${new URLSearchParams(queryParams)}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'x-access-token': accessToken,
      'x-cloud-id': cloudId,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(`failed fetch from ${url}`, await res.text());
    throw Error(`Failed to fetch from ${url}`);
  }

  const result = await res.json();
  return result;
}

// export async function getIssuesFromSprintWithChangeLog(boardId: number, sprintId: number) {
//   const issues = getIssuesFromSprint(boardId, sprintId);
//   getTimeInStatus(issues);
//
//   // console.log(boardId);
//   // console.log('sprintId', sprintId);
//   // const result = await callBackend('/playground/issues-with-changelog', {
//   //   boardId: `${boardId}`,
//   //   sprintId: `${sprintId}`,
//   // });
//   //
//   // console.log('result', result);
//
//   // const JiraResponseSchema = z.object({
//   //   maxResults: z.number(),
//   //   startAt: z.number(),
//   //   isLast: z.boolean(),
//   //   values: z.array(SprintSchema),
//   // });
//   //
//   // const validatedResponse = validateData(JiraResponseSchema, response);
//   //
//   // return validatedResponse.values[0];
// }

async function getTimeInStatus(issue: IssueWithChangeLog) {
  // let movedFromToDoToInProgress = '';
  // let movedFromInProgressToToDo = '';

  const inProgressColumns = await getInProgressStatuses();

  // const durationsInProgress: Duration[] = [];

  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgress = 0;

  issue.changelog.histories.sort(
    (a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf()
  );

  for (const history of issue.changelog.histories) {
    for (const item of history.items) {
      if (item.fieldId === 'status') {
        if (
          !inProgressStart &&
          item.fromString &&
          !inProgressColumns.includes(item.fromString) &&
          item.toString &&
          inProgressColumns.includes(item.toString)
        ) {
          // Issue moved to "In Progress"
          inProgressStart = parseISO(history.created);
          console.log('first if', inProgressStart);
        } else if (
          item.fromString &&
          inProgressColumns.includes(item.fromString) &&
          item.toString &&
          !inProgressColumns.includes(item.toString) &&
          inProgressStart
        ) {
          // Issue moved out of "In Progress"
          console.log('second if', parseISO(history.created));
          const duration = differenceInSeconds(parseISO(history.created), inProgressStart);
          console.log(
            'duration in time: ',
            formatDuration(intervalToDuration({ start: 0, end: duration * 1000 }))
          );
          console.log('duration', duration);
          totalTimeSpentInProgress += duration;
          inProgressStart = null;
        }
      }
    }
  }

  console.log('inProgressStart', inProgressStart);
  console.log('issue.fields.status.name', issue.fields.status.name);
  if (inProgressStart && inProgressColumns.includes(issue.fields.status.name)) {
    const currentDuration = differenceInSeconds(new Date(), inProgressStart);
    console.log('currentDuration', currentDuration);
    totalTimeSpentInProgress += currentDuration;
  }

  console.log(
    'totalTimeSpentInProgress',
    formatDuration(intervalToDuration({ start: 0, end: totalTimeSpentInProgress * 1000 }))
  );

  // issue.changelog.histories.forEach((history) => {
  //   const statusHistory = history.items.find((item) => item.fieldId === 'status');
  //   if (!statusHistory) {
  //     return;
  //   }
  //   if (statusHistory.fromString) {
  //     if (statusHistory.fromString === 'To Do') {
  //       if (statusHistory.toString && inProgressColumns.includes(statusHistory.toString)) {
  //         movedFromToDoToInProgress = history.created;
  //       }
  //     }
  //     if (
  //       inProgressColumns.includes(statusHistory.fromString) &&
  //       statusHistory.toString === 'To Do'
  //     ) {
  //       movedFromInProgressToToDo = history.created;
  //       if (movedFromToDoToInProgress) {
  //         durationsInProgress.push(
  //           getDurationBetweenDates(movedFromToDoToInProgress, movedFromInProgressToToDo)
  //         );
  //       }
  //     }
  //   }
  // });

  // const totalDurationInProgress = add(durationsInProgress[0], durationsInProgress[1]);

  // const intervalInProgressString = formatDuration(intervalInProgress, {
  //   locale: fr,
  // });
}

function getDurationBetweenDates(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return intervalToDuration({
    start: startDate,
    end: endDate,
  });
}
