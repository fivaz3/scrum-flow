import { callApi, validateData } from '@/lib/jira.service';
import { z } from 'zod';

const MemberSchema = z.object({
  accountId: z.string(),
  displayName: z.string(),
  emailAddress: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

export async function getMembers(): Promise<Member[]> {
  const response = await callApi(`/rest/api/2/users`);

  const MemberAndAppSchema = MemberSchema.merge(
    z.object({
      accountType: z.string(),
      emailAddress: z.string().optional(),
    })
  );

  const membersAndApps = validateData(z.array(MemberAndAppSchema), response);

  const members = membersAndApps.filter((member) => member.accountType === 'atlassian');

  return validateData(z.array(MemberSchema), members);
}
