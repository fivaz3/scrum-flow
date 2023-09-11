import { z } from 'zod';
import { MemberSchema } from '@/app/(dashboard)/settings/Calendar/member.service';

const IssueFieldsSchema = z.object({
  summary: z.string(),
  assignee: MemberSchema.nullable(),
  status: z.object({
    id: z.string(),
    name: z.string(),
    statusCategory: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),
});

export const IssueSchema = z.object({
  id: z.string(),
  key: z.string(),
  fields: IssueFieldsSchema,
  estimation: z.number().nullable(),
});

export type Issue = z.infer<typeof IssueSchema>;

export type IssueWithTimeSpent = Issue & {
  timeSpent: number;
};
