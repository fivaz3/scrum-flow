import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import { Issue } from '@/lib/issue.service';

export default async function IssueTable({ issues }: { issues: Issue[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.name}</TableCell>
            {/*<TableCell>*/}
            {/*  <Text>{issue.username}</Text>*/}
            {/*</TableCell>*/}
            {/*<TableCell>*/}
            {/*  <Text>{issue.email}</Text>*/}
            {/*</TableCell>*/}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
