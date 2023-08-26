import AtlassianProvider from 'next-auth/providers/atlassian';

const JIRA_API_CLASSIC_SCOPES =
  'read:jira-work ' +
  'manage:jira-project ' +
  'manage:jira-configuration ' +
  'read:jira-user ' +
  'write:jira-work ' +
  'manage:jira-webhook ' +
  'manage:jira-data-provider ';

const USER_IDENTITY_API_CLASSIC_SCOPES = 'read:me ';

// According to https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/
const SCOPE_FOR_REFRESH_TOKEN = 'offline_access ';

const NECESSARY_GRANULAR_SCOPES =
  'read:issue-details:jira ' +
  'read:jql:jira ' +
  'read:sprint:jira-software ' +
  'read:board-scope.admin:jira-software ' +
  'read:project:jira ';

const SCOPES_THAT_I_MIGHT_NEED =
  'write:board-scope.admin:jira-software ' +
  'delete:board-scope.admin:jira-software ' +
  'write:board-scope:jira-software ' +
  'read:board-scope:jira-software ' +
  'read:epic:jira-software ' +
  'write:epic:jira-software ' +
  'read:issue:jira-software ' +
  'write:issue:jira-software ' +
  'write:sprint:jira-software ' +
  'delete:sprint:jira-software ' +
  'read:source-code:jira-software ' +
  'write:source-code:jira-software ' +
  'read:feature-flag:jira-software ' +
  'write:feature-flag:jira-software ' +
  'read:deployment:jira-software ' +
  'write:deployment:jira-software ' +
  'read:build:jira-software ' +
  'write:build:jira-software ' +
  'read:remote-link:jira-software ' +
  'write:remote-link:jira-software ';

export const atlassianProvider = AtlassianProvider({
  clientId: process.env.ATLASSIAN_CLIENT_ID as string,
  clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
  authorization: {
    params: {
      scope: `${JIRA_API_CLASSIC_SCOPES}${USER_IDENTITY_API_CLASSIC_SCOPES}${SCOPE_FOR_REFRESH_TOKEN}${NECESSARY_GRANULAR_SCOPES}${SCOPES_THAT_I_MIGHT_NEED}`,
    },
  },
});
