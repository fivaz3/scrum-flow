import { Grid, Title, Text } from '@tremor/react';
import { getActiveSprint } from '@/lib/sprint.service';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';
import IssueTable from '@/app/sprint/IssueTable';
import { format, parseISO } from 'date-fns';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 },
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 },
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 },
];

const data1 = [
  {
    category: 'Website',
    stat: '10,234',
    data: website,
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop,
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app,
  },
];

export default async function ActiveSprintPage() {
  // TODO create a way to get the board Id
  const boardId = 2;
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
        <Title className="text-2xl">Sprint Actuel: {currentSprint.name}</Title>
        <Text>Commence le : {format(parseISO(currentSprint.startDate), 'dd/MM/yyyy à HH:mm')}</Text>
        <Text>Fini le : {format(parseISO(currentSprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
        <Grid className="gap-6 mt-4">
          <IssueTable label="To Do" issues={toDoIssues}></IssueTable>
          <IssueTable label="Doing" issues={doingIssues}></IssueTable>
          <IssueTable label="Done" issues={doneIssues}></IssueTable>
        </Grid>
      </div>
    </main>
  );
}
