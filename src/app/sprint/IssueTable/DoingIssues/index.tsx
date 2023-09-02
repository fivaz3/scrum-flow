'use client';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react';
import { Issue } from '@/lib/issue.service';

export interface DoingIssuesProps {
  issues: Issue[];
}

export default function DoingIssues({ issues }: DoingIssuesProps) {
  return (
    <Card>
      <Title>To Do</Title>
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
    </Card>
  );
}
