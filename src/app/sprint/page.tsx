import { Card, Flex, Grid, Metric, Title, Text } from '@tremor/react';
import IssueTable from '@/app/sprint/IssueTable';
import { getActiveSprint } from '@/app/sprint/sprint-api';
import { getAccessToken, getCloudId } from '@/app/sprint/jira-api';

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
  const accessToken = await getAccessToken();
  const cloudId = await getCloudId(accessToken);
  const currentSprint = await getActiveSprint(accessToken, cloudId);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {currentSprint ? (
        <div>
          <Title className="text-2xl">Sprint Actuel: {currentSprint.name}</Title>
          <Text>Commence le :{currentSprint.startDate}</Text>
          <Text>Fini le :{currentSprint.endDate}</Text>
          <IssueTable issues={[]}></IssueTable>
        </div>
      ) : (
        <div>
          <Title>Il n&apos;y a pas encore de sprint actives</Title>
        </div>
      )}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data1.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex justifyContent="start" alignItems="baseline" className="space-x-2">
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            {/*<BarList*/}
            {/*  data={item.data}*/}
            {/*  valueFormatter={(number: number) => Intl.NumberFormat('us').format(number).toString()}*/}
            {/*  className="mt-2"*/}
            {/*/>*/}
          </Card>
        ))}
      </Grid>
      {/*<Chart />*/}
    </main>
  );
}
