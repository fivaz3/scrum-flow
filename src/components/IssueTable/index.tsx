'use client';

import { Issue } from '@/lib/issue.service';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';

export interface IssueTableProps {
  issues: Issue[];
}
export default function IssueTable({ issues }: IssueTableProps) {
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
