import { callApi, validateData } from '@/lib/jira.service';
import { z } from 'zod';

export const MemberSchema = z.object({
  accountId: z.string(),
  displayName: z.string(),
  emailAddress: z.string(),
  avatarUrls: z.object({
    '48x48': z.string(),
    '24x24': z.string(),
    '16x16': z.string(),
    '32x32': z.string(),
  }),
});

export type Member = z.infer<typeof MemberSchema>;

export async function getMembers(accessToken: string, cloudId: string): Promise<Member[]> {
  const response = await callApi(`/rest/api/2/users`, {}, accessToken, cloudId);

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
