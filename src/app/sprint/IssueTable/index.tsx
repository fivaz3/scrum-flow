'use client';

import { Issue } from '@/lib/issue.service';
import {
  Table,
  Text,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

export interface IssueTableProps {
  issues: Issue[];
}
export default function IssueTable({ issues }: IssueTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Estimation</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>
              <Text>{issue.fields.summary}</Text>
            </TableCell>
            <TableCell>
              <Text>{issue.fields.estimation}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
